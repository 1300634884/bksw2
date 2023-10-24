<template>
    <el-card>
        <el-form>
            <el-form-item label="sku名称">
                <el-input placeholder="请输入sku名称" v-model="skuParams.skuName"></el-input>
            </el-form-item>
            <el-form-item label="价格（元）">
                <el-input placeholder="请输入价格（元）" v-model="skuParams.price"></el-input>
            </el-form-item>
            <el-form-item label="重量（克）">
                <el-input placeholder="请输入重量（克）" v-model="skuParams.weight"></el-input>
            </el-form-item>
            <el-form-item label="sku描述">
                <el-input type="textarea" placeholder="请输入sku描述" v-model="skuParams.skuDesc"></el-input>
            </el-form-item>
            <el-form-item label="平台属性">
                <el-form inline>
                    <el-form-item :label="`${attr.attrName}`" v-for="(attr, index) in attrArr" :key="attr.id"
                        style="margin: 5px;">
                        <el-select v-model="attr.attrIdAndValueId">
                            <el-option :value="`${attr.id}:${item.id}`" :label="`${item.valueName}}`"
                                v-for="(item, index) in attr.attrValueList" :key="item.attrId"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-form inline>
                    <el-form-item :label='`${SaleAttr.saleAttrName}`' v-for="(SaleAttr, index) in saleArr"
                        :key="SaleAttr.id">
                        <el-select v-model="SaleAttr.saleIdAndValueId">
                            <el-option :label='`${AttrValue.saleAttrValueName}`' :value="`${SaleAttr.id}:${AttrValue.id}`"
                                v-for="(AttrValue, index) in SaleAttr.spuSaleAttrValueList" :key="AttrValue.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="图片名称">
                <el-table style="width: 100%" border :data="imgArr" ref="table">
                    <el-table-column type="selection" width="55px" />
                    <el-table-column label="图片" width="400px">
                        <template #="{ row, $index }">
                            <img :src="row.url" alt="" style=" width: 200px;height: 200px;">
                        </template>
                    </el-table-column>
                    <el-table-column label=" 名称" prop="name" />
                    <el-table-column label="操作">
                        <template #="{ row, index }">
                            <el-button type="warning" @click="hander(row)">
                                设置默认
                            </el-button></template>

                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save">保存</el-button>
                <el-button type="primary" @click="cancel">取消</el-button>
            </el-form-item>


        </el-form>
    </el-card>
</template>  
<script setup lang="ts">
import { defineProps, defineEmits, watch, ref, defineExpose, reactive } from "vue"
import { reqSpuImage, reqSpuHassaleattr, reqAddSku } from "@/api/product/spu/index.ts"
import useCateGoryStore from "@/store/modules/category.ts"
import { reqattr } from "@/api/product/attr/index.ts"
import { ElMessage } from "element-plus";
let attrArr = ref([])
let $emit = defineEmits(['changeScene'])
let imgArr = ref([])
let saleArr = ref([])
let attr = ref('')
let table = ref()
let categoryStore = useCateGoryStore()
let skuParams = reactive({
    category3Id: "",//三级分类的ID
    spuId: "",//已有的SPU的ID
    tmId: "",//SPU品牌的ID
    //v-model收集
    skuName: "",//sku名字
    price: "",//sku价格
    weight: "",//sku重量
    skuDesc: "",//sku的描述

    skuAttrValueList: [//平台属性的收集
    ],
    skuSaleAttrValueList: [//销售属性
    ],
    skuDefaultImg: "",//sku图片地址
})
const save = async () => {
    // 平台属性
    skuParams.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
        if (next.attrIdAndValueId) {
            let [attrId, valueId] = next.attrIdAndValueId.split(':');
            prev.push({
                attrId,
                valueId
            })
        }
        return prev;
    }, []);
    //销售属性
    skuParams.skuSaleAttrValueList = saleArr.value.reduce((prev: any, next: any) => {
        if (next.saleIdAndValueId) {
            let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':');
            prev.push({
                saleAttrId, saleAttrValueId
            })
        }
        return prev;
    }, []);
    let result = await reqAddSku(skuParams)
    if (result.code === 200) {
        ElMessage({
            type: 'success',
            message: '添加成功'
        })
    } else {
        ElMessage({ type: 'error', message: '添加失败' })
    }
    $emit('changeScene', { flag: 0, params: skuParams.spuId ? 'updata' : "add" })
}
const hander = (row) => {
    skuParams.skuDefaultImg = row.url
    imgArr.value.forEach((item) => {
        table.value.toggleRowSelection(item, false)
    })
    table.value.toggleRowSelection(row, true)
    skuParams.skuDefaultImg = row.url
}
const initHasSkuData = async (sku) => {
    const { c1Id, c2Id, c3Id } = categoryStore
    skuParams.category3Id = c3Id,
        skuParams.spuId = sku.id,
        skuParams.tmId = sku.tmid
    if (sku) {
        let result2 = await reqSpuImage(sku.id)
        imgArr.value = result2.data.map(item => {
            return {
                name: item.imgName,
                url: item.imgUrl
            }
        })
    }
    let result1 = await reqSpuHassaleattr(sku.id)
    saleArr.value = result1.data


}

let cancel = () => {
    $emit('changeScene', { flag: 0, params: "" })
}
watch(() => categoryStore.c3Id, () => {
    attrArr.value = []
    if (categoryStore.c3Id) {
        attrs()

    }
})

defineProps(['scene'])

const attrs = async () => {
    const { c1Id, c2Id, c3Id } = categoryStore
    // 因为解构非响应式,所以每次使用前解构
    let result = await reqattr(c1Id, c2Id, c3Id)
    if (result.code == 200) {
        attrArr.value = result.data

        return 'ok'
    } else {
        return Promise.reject(new Error('请求失败'))
    }
}
defineExpose({ initHasSkuData })
</script>

<style scoped></style>