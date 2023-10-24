<template>
    <el-table style="width: 100%" :data=skuArr margin>
        <el-table-column prop="id" label="序号" width="150" />
        <el-table-column prop="skuName" label="名称" width="200" show-overflow-tooltip />
        <el-table-column prop="skuDesc" label="描述" width="200" show-overflow-tooltip />
        <el-table-column label="默认图片" width="200">
            <template #="{ row, index }">
                <img :src="row.skuDefaultImg" alt="" style="width: 200px;height: 200px;">
            </template>
        </el-table-column>
        <el-table-column prop="weight" label="重量" width="600" />
        <el-table-column prop="price" label="价格" width="300" />
        <el-table-column fixed="right" label="操作" width="300">
            <template #="{ row }">
                <el-button size="small" :icon="row.isSale ? 'bottom' : 'top'" :type="row.isSale ? 'info' : 'success'"
                    @click="cgIsSale(row)"></el-button>
                <el-button type="primary" size="small" icon="edit"></el-button>
                <el-button type="info" size="small" icon="sunny" @click="findSku(row)"></el-button>
                <el-popconfirm :title="`你确定要删除${row.skuName}?`" @confirm="delSku(row)">
                    <template #reference>
                        <el-button type="danger" size="small" icon="delete"></el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination v-model:current-page=pageNo v-model:page-size=pageSize :page-sizes="[10, 20, 30, 40]"
        layout=" prev, pager, next, jumper,->,total,sizes" :total="total" background @current-change="getHasSku"
        @size-change="handler" />
    <el-drawer v-model="drawer" title="I am the title">
        <template #header>
            <h4>查看商品详情</h4>
        </template>
        <template #default>
            <el-row style="font-size: 25px; margin: 10px">
                <el-col :span="6">名称</el-col>
                <el-col :span="18">{{ skuInfo.skuName }}</el-col>
            </el-row>
            <el-row style="font-size:25px; margin: 10px">
                <el-col :span="6">描述</el-col>
                <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
            </el-row>
            <el-row style="font-size: 25px; margin: 10px">
                <el-col :span="6">价格</el-col>
                <el-col :span="18">{{ skuInfo.price }}</el-col>
            </el-row>
            <el-row style="font-size: 25px; margin: 10px">
                <el-col :span="6">平台属性</el-col>
                <el-col :span="18">
                    <el-tag margin="5px" v-for="item in skuInfo.skuAttrValueList" :key="item.id">{{ item.valueName
                    }}</el-tag>
                </el-col>
            </el-row>
            <el-row style="font-size: 25px; margin: 10px">
                <el-col :span="6">销售属性</el-col>
                <el-col :span="18">
                    <el-tag margin="5px" v-for="item in skuInfo.skuSaleAttrValueList" :key="item.id">{{
                        item.saleAttrValueName
                    }}</el-tag>
                </el-col>
            </el-row>
            <el-row style="font-size: 25px; margin: 10px">
                <el-col :span="6">商品图片</el-col>
                <el-col :span="18">
                    <el-carousel :interval="4000" type="card" height="200px">
                        <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                            <img :src="item.imgUrl" alt="" style="width: 100%;height: 100%;">
                        </el-carousel-item>
                    </el-carousel>
                </el-col>
            </el-row>
        </template>
    </el-drawer>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqSkuList, reqCancelSale, reqSaleSku, reqSkuInfo, reqRemoveSku } from "@/api/product/sku"
import { ElMessage } from 'element-plus';
let pageNo = ref(1)
let total = ref()
let pageSize = ref(10)
let drawer = ref(false)
let skuArr = ref([{
    // id: '',
    // createTime: "",
    // updateTime: "",
    // spuId: "",
    // price: " ",
    // skuName: "",
    // skuDesc: "",
    // weight: "",
    // tmId: "",
    // category3Id: "1",
    // skuDefaultImg: "",
    // isSale: "",
}])
let skuInfo = ref({})
const findSku = async (row) => {
    let result = await reqSkuInfo(row.id)
    if (result.code == 200) {
        skuInfo.value = result.data
        drawer.value = true
        return 'ok'
    } else {
        drawer.value = true
        return Promise.reject(new Error('请求失败'))
    }
}
const delSku = async (row) => {

    let result = await reqRemoveSku(row.id)
    if (result.code == 200) {
        ElMessage({ type: 'success', message: '删除成功' })
    } else {
        ElMessage({ type: 'error', message: '删除失败' })
    }
    getHasSku()
}
const handler = () => {
    getHasSku()
}
const cgIsSale = async (row) => {
    if (!row.isSale) {


        let result = await reqSaleSku(row.id)


    } else {

        await reqCancelSale(row.id)

    }
    getHasSku()
    row.isSale = !row.isSale
}

const getHasSku = async (pager = 1) => {
    pageNo.value = pager
    let result = await reqSkuList(pageNo.value, pageSize.value)
    if (result.code == 200) {
        skuArr.value = result.data.records
        total.value = result.data.total
        return "Ok"
    } else {
        return Promise.reject(new Error("请求失败"))
    }

}
onMounted(() => {
    getHasSku()
})

</script>

<style scoped>
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>