<template>
  <el-card class="box-card">
    <el-button type="primary" icon="Plus" style="margin: 5px 0;" @click="addTrademark" v-has="`btn.Trademark.add`">添加品牌</el-button>
    <el-table style="width: 100%" border align="center" :data="record" type="index">
      <el-table-column prop="id" width="80" label="序号" />
      <el-table-column prop="tmName" label="品牌名称" />
      <el-table-column prop="logoUrl" label="品牌logo">
        <template #="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 40px;height: 40px;">
        </template>

      </el-table-column>
      <el-table-column prop="createTime" label="品牌操作">
        <template #="{ row }">
          <el-button icon="Edit" type="primary" @click="updataTrademark(row)"></el-button>
          <el-popconfirm title="确认删除吗" @confirm="delTradeMark(row.id)">
            <template #reference><el-button icon="Delete" type="danger"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page=pageNo v-model:page-size=limit :page-sizes="[3, 5, 7, 9]" :small="true"
      :background="true" layout=" prev, pager, next, jumper,->,total, sizes," :total="total" @click="cPage" />
  </el-card>
  <!--  -->
  <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'">
    <el-form :model="trademarkParams" :rules="rules" ref="formRef">
      <el-form-item label="品牌名称" label-width="80px" prop="tmName">
        <el-input placeholder="请输入品牌名称" style="width: 80%;" v-model="trademarkParams.tmName"></el-input>
      </el-form-item>
      <el-form-item label="品牌logo" label-width="80px" prop="logoUrl">
        <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="true"
          :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="confirm">确定</el-button>
      <el-button type="warning" @click="cancel">取消</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reqTrademark, delTrademark } from '@/api/product/trademark'
import { ref, onMounted } from 'vue';
import useProductRouter from '@/store/modules/trademark.ts'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { reactive } from 'vue';

let dialogFormVisible = ref<boolean>(false)
let addTrademark = () => {
  formRef.value?.clearValidate('tmName')
  formRef.value?.clearValidate('logoUrl')
  dialogFormVisible.value = true
}

let pageNo = ref<number>(1)
let limit = ref<number>(3)
let productRouter = useProductRouter()
let record = ref([])
let total = ref()
let formRef = ref()
let trademarkParams = reactive({
  tmName: '',
  logoUrl: '',

})
const delTradeMark = async (id: number) => {
  let result = await delTrademark(id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    cPage()
    return 'ok'
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
    return Promise(new Error('删除失败'))
  }
  cPage()
}
const validatorTmName = (rule, value, callback) => {

  if (value.trim() >= 2) {
    callback()
  } else {
    callback(new Error('品牌名称不能少于2个字'))
  }
}
let updataTrademark = (row) => {
  formRef.value?.clearValidate('tmName')
  formRef.value?.clearValidate('logoUrl')
  dialogFormVisible.value = true
  Object.assign(trademarkParams, row)
}
onMounted(() => {
  cPage()
})
const cancel = () => {
  dialogFormVisible.value = false
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  trademarkParams.id = 0
}
const confirm = async () => {
  await formRef.value.validate()
  let result = await reqTrademark(trademarkParams)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功' })
    dialogFormVisible.value = false
    cPage()
    trademarkParams.tmName = ''
    trademarkParams.logoUrl = ''
    trademarkParams.id = 0
  } else {
    ElMessage.error(trademarkParams.id ? '修改品牌失败' : '添加品牌失败')

    trademarkParams.tmName = ''
    trademarkParams.logoUrl = ''
    trademarkParams.id = 0
  }



}

let cPage = async () => {

  await productRouter.HasTrademark(pageNo.value, limit.value)
  record.value = productRouter.data.records
  total.value = productRouter.data.total
}
const beforeAvatarUpload: UsploadProps['beforeUpload'] = (rawFile) => {

}
const validatorLogoUrl = (rule, value, callback) => {
  if (value) {
    callback()
  } else {
    callback(new Error('请上传品牌logo'))
  }
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  formRef.value.clearValidate()
  trademarkParams.logoUrl = response.data

}
const rules = {
  tmName: [
    { required: true, trigger: 'blur', validator: validatorTmName },

  ],
  logoUrl: [
    {
      required: true, tragger: 'change', validator: validatorLogoUrl
    }
  ]
}



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