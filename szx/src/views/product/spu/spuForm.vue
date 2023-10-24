<template>
    <el-card>
        <el-form>
            <el-form-item label="SPU名称">
                <el-input style="width: 300px;" placeholder="请输入SPU的名称 " v-model="SpuParams.spuName"></el-input>
            </el-form-item>
            <el-form-item label="SPU品牌">
                <el-select label="SPU品牌" v-model="SpuParams.tmId">
                    <!-- :value获取相应信息给v-model  未完成-->
                    <el-option v-for="(item, index) in AllTradeMark" :key="item.id" :label="item.tmName" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input autosize type="textarea" placeholder="请你输入描述" v-model="SpuParams.description" />
            </el-form-item>
            <el-form-item label="SPU照片">
                <!-- :action为上传图片的接口地址 -->
                <el-upload v-model:file-list="imgList" action="/api/admin/product/fileUpload" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>
                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
            </el-form-item>
            <el-form-item label="SPU销售属性">
                <el-select v-model="saleAttrIdAndValueName"
                    :placeholder="unSelectSaleAttr.length ? `还未选择${unSelectSaleAttr.length}个` : '无'">
                    <el-option :value="`${item.id}:${item.name}`" v-for="(item, index) in unSelectSaleAttr" :key="item.id"
                        :label="item.name"></el-option>
                </el-select>
                <el-button @click="addSaleAttr" :disabled="saleAttrIdAndValueName ? false : true" style="margin-left:10px"
                    type="primary" size="default" icon="Plus">添加属性</el-button>

                <el-table :data="saleAttr">
                    <el-table-column label="序号" width="50px" prop="baseSaleAttrId"></el-table-column>
                    <el-table-column label="销售属性名" width="120px" prop="saleAttrName"></el-table-column>
                    <el-table-column label="销售属性值">
                        <template #="{ row, $index }">
                            <el-tag v-for=" (item, index) in row.spuSaleAttrValueList" :key="item.id" closable
                                style="margin: 0 5px;" @close="handleClose(row, item)">
                                {{ item.saleAttrValueName }}
                            </el-tag>
                            <el-button icon="plus" type="success" style="height: 23px;" @click="toEdit(row)"
                                v-if="!row.flag"> </el-button>
                            <el-input v-model="row.saleAttrValue" @blur="toLook(row)" v-if="row.flag"
                                style="width: 100px; height: 25px;" placeholder="请你输入属性值">
                            </el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作"></el-table-column>
                </el-table>
                <el-button type="primary" style="margin: 10px 5px;" @click="save">保存</el-button>
                <el-button style="margin: 10px 5px;" @click="cancel">取消</el-button>
            </el-form-item>

        </el-form>
    </el-card>
</template>
<script setup lang="ts">

import { reactive, ref, defineEmits, defineExpose, computed } from 'vue';
import { ElMessage } from 'element-plus'
import { reqAllTrademark, reqSpuImage, reqSpuHassaleattr, reqAllSaleattr } from '@/api/product/spu/index.ts'
import { reqAddOrUpdateSpu } from "@/api/product/spu/index.ts"
let $emit = defineEmits(['changeScene'])

let AllTradeMark = ref([])
let imgList = ref([])
let saleAttr = ref([])
let allSaleAttr = ref([])
// let description = ref("")
// let spuName = ref("")
let SpuParams = ref({
    category3Id: "",
    spuName: "",
    description: "",
    tmId: "",
    spuImageList: [],
    spuSaleAttrList: [],
})




let dialogImageUrl = ref("")
let dialogVisible = ref(false)
let saleAttrIdAndValueName = ref<string>('')
let unSelectSaleAttr = computed(() => {
    //全部销售属性:颜色、版本、尺码
    //已有的销售属性:颜色、版本

    let unSelectArr = allSaleAttr.value.filter(item => {
        return saleAttr.value.every(item1 => {
            return item.name != item1.saleAttrName;
        });
    })
    return unSelectArr;

})
const handleClose = (row, item) => {
    row.spuSaleAttrValueList.splice(row.spuSaleAttrValueList.indexOf(item), 1)
}
const initAddSpu = async (c3Id) => {
    // 在add中触发
    Object.assign(SpuParams.value, {
        category3Id: "",
        spuName: "",
        description: "",
        tmId: "",
        spuImageList: [],
        spuSaleAttrList: [],
    })
    saleAttrIdAndValueName.value = ""
    imgList.value = []
    saleAttr.value = []
    SpuParams.value.category3Id = c3Id
    let result = await reqAllTrademark()
    let result3 = await reqAllSaleattr()


    AllTradeMark.value = result.data
    allSaleAttr.value = result3.data
}
const save = async () => {
    SpuParams.value.spuImageList = imgList.value.map(item => {
        return {
            imgName: item.name,
            imgUrl: (item.response && item.response.data) || item.url
        }
    })
    SpuParams.value.spuSaleAttrList = saleAttr.value
    let result = await reqAddOrUpdateSpu(SpuParams.value)

    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: SpuParams.value.id ? '更新成功' : '添加成功'
        })
        //通知父组件切换场景为0
        $emit('changeScene', { flag: 0, params: SpuParams.value.id ? 'updata' : 'add' });
    } else {
        ElMessage({
            type: 'success',
            message: SpuParams.value.id ? '更新成功' : '添加成功'
        })
    }
}

const addSaleAttr = () => {
    const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')
    let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
    }
    saleAttr.value.push(newSaleAttr)
    saleAttrIdAndValueName.value = ''

}
const handleRemove = () => {
}
const toLook = (row) => {
    const { baseSaleAttrId, saleAttrValue } = row;
    let newSaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: saleAttrValue
    }


    if ((saleAttrValue as string).trim() == '') {
        ElMessage({
            type: 'error',
            message: '属性值不能为空的'
        })
        row.flag = false
        return;
    }
    let repeat = row.spuSaleAttrValueList.find(item => {
        return item.saleAttrValueName == saleAttrValue;
    })
    if (repeat) {
        ElMessage({
            type: 'error',
            message: '属性值重复'
        })
        row.flag = false
        return;
    }
    row.spuSaleAttrValueList.push(newSaleAttrValue);
    row.flag = false
    row.saleAttrValue = ""
}
const toEdit = (row) => {
    row.flag = true

}
const handlePictureCardPreview = (file) => {
    dialogImageUrl.value = file.url
    dialogVisible.value = true
    // 1号是否有相应数据

}
const initHasSpuData = async (spu) => {
    if (spu) {
        SpuParams.value = spu
        let result1 = await reqSpuImage(spu.id)
        let result2 = await reqSpuHassaleattr(spu.id)
        saleAttr.value = result2.data
        imgList.value = result1.data.map(item => {
            return {
                name: item.imgName,
                url: item.imgUrl
            }
        })
    }
    let result = await reqAllTrademark()
    let result3 = await reqAllSaleattr()
    AllTradeMark.value = result.data
    allSaleAttr.value = result3.data
}
// defineExpose将该方法暴露给父亲
defineExpose({ initHasSpuData, initAddSpu })

const cancel = () => {
    $emit('changeScene', { flag: 0, params: 'updata' })
    ElMessage.success('取消成功')
    // description.value = ""
    // spuName.value = ""
}
const imageUrl = ref('')
// const aa = async () => {
//     let result = await reqAllTrademark
// }

let trademarkParams = reactive({
    tmName: '',
    logoUrl: '',
})
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}
</script>

<style scoped></style>