<template>
    <Category></Category>
    <el-card v-show="scene == 0">
        <div>
            <el-button type="primary" @click="addSpu">添加SPU</el-button>
            <el-table style="width: 100%" :data="spuList">
                <el-table-column prop="id" label="序号" width="180px" />
                <el-table-column prop="spuName" label="SPU名称" width="180px" />
                <el-table-column prop="description" label="SPU描述" />
                <el-table-column label="操作">
                    <template #="{ row, $index }">
                        <el-button type="primary" icon="Plus" title="添加SKU" @click="addSku(row)"></el-button>
                        <el-button type="warning" icon="Edit" title="修改SPU" @click="updataSpu(row)"> </el-button>
                        <el-button type="info" icon="InfoFilled" title="查看SKU列表" @click="findSku(row)"> </el-button>
                        <el-popconfirm :title="`确定删除${row.spuName}`" @confirm="deleteSpu(row)">
                            <template #reference>
                                <el-button type="danger" icon="Delete" title="删除SPU"></el-button>
                            </template>
                        </el-popconfirm>

                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination background layout="prev, pager, next,jumper,->,total,sizes" :total="total" :page-sizes="[3, 5, 7, 9]"
            v-model:page-size=limit v-model:current-page=pageNo @size-change=reqspu(pageNo)
            @current-change=reqspu(pageNo) />
        <!-- current-page为第多少页page-size为每页多少条数据 -->
    </el-card>
    <spuForm v-show="scene == 1" @changeScene="changeScene" :scene="scene" ref="spu"></spuForm>
    <skuForm v-show="scene == 2" @changeScene="changeScene" ref="sku"> </skuForm>
    <el-dialog v-model="show" title="sku列表">
        <el-table border :data="skuArr">
            <el-table-column label="名字" prop="skuName" width="100px"></el-table-column>
            <el-table-column label="价格" prop="price" width="100px"></el-table-column>
            <el-table-column label="重量" prop="weight" width="100px"></el-table-column>
            <el-table-column label="图片">
                <template #="{ row, index }">
                    <img :src="row.skuDefaultImg" alt="" style="width: 200px; height: 200px;"></template>
            </el-table-column>
        </el-table>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { reqhasspu, reqSkuList, reqRemoveSpu } from '@/api/product/spu/index.ts'
import useCateGoryStore from '@/store/modules/category'
import spuForm from './spuForm.vue'
import skuForm from "./skuForm.vue"
let categoryStore = useCateGoryStore()
let total = ref(0)
let limit = ref(3)
let pageNo = ref(1)
let spuList = ref([])
let scene = ref(0)
let spu = ref()
let sku = ref()
let skuArr = ref([])
let SpuParams = ref({
    category3Id: "",
    spuName: "",
    description: "",
    tmId: "",
    spuImageList: [],
    spuSaleAttrList: [],
})

let show = ref(false)
onBeforeUnmount(() => {
    categoryStore.$reset()
})
const deleteSpu = (row) => {
    let result = reqRemoveSpu(row.id)

    reqspu()

}

const findSku = async (row) => {

    let result = await reqSkuList(row.id)
    if (result.code == 200) {
        skuArr.value = result.data


        show.value = true
    }
    show.value = true
}
const addSpu = () => {
    scene.value = 1
    spu.value.initAddSpu(categoryStore.c3Id)
    spu.value.initHasSpuData()
}
const addSku = (row) => {
    scene.value = 2
    sku.value.initHasSkuData(row)



}
const changeScene = (obj) => {
    scene.value = obj.flag
    if (obj.params == "updata") {
        reqspu(pageNo.value)
    } else {
        reqspu()
    }

}
const updataSpu = (row) => {
    scene.value = 1
    spu.value.initHasSpuData(row)
}
const reqspu = async (pager = 1) => {
    const { c3Id } = categoryStore
    pageNo.value = pager
    let result = await reqhasspu(pageNo.value, limit.value, c3Id)
    if (result.code == 200) {
        spuList.value = result.data.records
        total.value = result.data.total
    } else {
        return Promise.reject(new Error('请求失败'))
    }
}
watch(() => categoryStore.c3Id, () => {
    reqspu()
})





</script>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>