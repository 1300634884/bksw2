<template>
    <el-table style="width: 100%; margin-bottom: 20px" row-key="id" border :data="PermisstionArr">
        <el-table-column prop="name" label="名称" />
        <el-table-column label="权限值" prop="code" />
        <el-table-column label="修改时间" prop="updateTime" />
        <el-table-column label="操作">
            <template #="{ row, index }">
                <el-button type="primary" @click="addPermisstion" :disabled="row.level == 4"> {{ row.level != 3 ?
                    "添加菜单" : '添加功能' }}</el-button>
                <el-button type="primary" :disabled="row.level == 1" @click="updataPermisstion(row)">编辑</el-button>
                <el-button type="primary" :disabled="row.level == 1" @click="Delete(row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" width="30%" :title='!menuDate.pid ? "添加菜单" : "修改菜单"'>
        <el-form>
            <el-form-item label="名称" style="margin: 22px 12px;"><el-input placeholder="请填写名称" style="width: 400px;"
                    v-model="menuDate.name"></el-input>
            </el-form-item>
            <el-form-item label="权限值"><el-input placeholder="请填权限值" style="width: 400px;"
                    v-model="menuDate.code"></el-input>
            </el-form-item>
        </el-form>

        <template #footer>
            <el-button @click="cancel"> 取消</el-button>
            <el-button type="primary" @click="save"> 确定</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { reqAllPermisstion, reqAddOrUpdateMenu, reqRemoveMenu } from "@/api/acl/menu/index"
import { ElMessage } from "element-plus";
import { onMounted, ref, reactive } from "vue";
let PermisstionArr = ref([])
let dialogVisible = ref(false)
let menuDate = reactive({
    code: '',
    level: 0,
    name: '',
    pid: 0,
})
const Delete = async (row) => {
    let result = await reqRemoveMenu(row.id)
    if (result.code == 200) {
        ElMessage.success("删除成功")
    } else {
        ElMessage.error("删除失败")
    }
    getHasPermisstion()
}
const save = async () => {
    let result = await reqAddOrUpdateMenu(menuDate)
    if (result.code == 200) {


        ElMessage.success("添加成功")
    } else { ElMessage.success("添加成功") }
    getHasPermisstion()
    dialogVisible.value = false
}
const cancel = () => { dialogVisible.value = false }
const addPermisstion = () => {
    Object.assign(menuDate, {
        code: '',
        level: 0,
        name: '',
        pid: 0,
    })
    dialogVisible.value = true
}
const updataPermisstion = (row) => {
    Object.assign(menuDate, row)
    dialogVisible.value = true
}
const getHasPermisstion = async () => {
    let result = await reqAllPermisstion()
    if (result.code === 200) {
        // 获取成功
        PermisstionArr.value = result.data
    }
}
onMounted(() => {
    getHasPermisstion()
})

</script>

<style scoped></style>