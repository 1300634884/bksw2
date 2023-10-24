<template>
    <el-card style="margin: 10px;">
        <el-form :inline="true" class="form">
            <el-form-item label="角色名:">
                <el-input style="width: 200px;" placeholder="请输入角色名" v-model="keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search"> 搜索</el-button>
                <el-button @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px;">
        <el-button icon="plus" type="primary" style="margin: 10px;" @click="addUser">添加角色</el-button>
        <el-table :data="allRole" border :rules="rules">
            <el-table-column label="#" width="50px" type="index"></el-table-column>
            <el-table-column label="id" prop="id" width="80px"></el-table-column>
            <el-table-column label="角色名称" prop="roleName"></el-table-column>
            <el-table-column label="创建时间" prop="createTime"></el-table-column>
            <el-table-column label="更新时间" prop="updateTime"></el-table-column>
            <el-table-column label="操作" width="350px">
                <template #="{ row, index }">
                    <el-button icon="user" type="primary" @click="setPermisstion(row)"> 分配权限</el-button>
                    <el-button icon="edit" type="primary" @click="updateRole(row)">编辑</el-button>
                    <el-button icon="delete" type="primary" @click="removeRole(row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]" background
            layout=" prev, pager, next, jumper,->,total, sizes," :total="total" @size-change="getHasRole"
            @current-change="getHasRole" />
    </el-card>
    <el-drawer v-model="drawer">

        <template #header>
            <span>分配权限</span>
        </template>
        <template #default>
            <div>
                <el-tree show-checkbox node-key="id" default-expand-all :data="menuArr" :props="defaultProps" ref="tree"
                    :default-checked-keys="selcetArr" />
            </div>
        </template>
        <template #footer>
            <el-button @click="confirmClick" type="primary"> 确定</el-button>
            <el-button @click="drawer = false">取消</el-button>
        </template>
    </el-drawer>
    <el-dialog v-model="dialogVisible" :title="RoleParams.id ? '添加' : '更新'">
        <el-form :model="RoleParams" :rules="rules" ref="formRef">
            <el-form-item label="角色名称" prop="roleName">
                <el-input placeholder="请填写角色名称" v-model="RoleParams.roleName"> </el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="primary" @click=save>确定</el-button>
            <el-button @click="cancel">取消</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { reqAllRoleList, reqAddOrUpdateRole, reqAllMenuList, reqSetPermisstion, reqRemoveRole } from "@/api/acl/role/index"
import useLayOutSettingStore from '@/store/modules/setting'
import { ElMessage } from 'element-plus'
let pageNo = ref(1)
let pageSize = ref(10)
let total = ref(40)
let drawer = ref(false)
let keyword = ref('')
let allRole = ref([])
let dialogVisible = ref(false)
let LayOutSettingStore = useLayOutSettingStore()
let formRef = ref()
let RoleParams = reactive({
    id: 0,
    roleName: ''
})
let tree = ref()
let selcetArr = ref([])
let menuArr = ref([])
const defaultProps = {
    children: 'children',
    label: 'name',
}
const confirmClick = async () => {

    let arr1 = tree.value.getCheckedKeys()
    let arr2 = tree.value.getHalfCheckedKeys().concat(arr1)

    let result = await reqSetPermisstion(RoleParams.id, arr2)
    if (result.code == 200) {
        ElMessage.success('设置成功')
    } else {
        ElMessage.error('设置失败')
    }
    drawer.value = false
    LayOutSettingStore.refsh = !LayOutSettingStore.refsh
}
const validateName = (rule: any, value: any, callback: any) => {
    if (value == '') {
        callback(new Error('请输入用户名'))
    }
    if (value.length < 5) {
        callback(new Error('输入用户名小于5'))

    }

}
const removeRole = async (id) => {
    let result = await reqRemoveRole(id)
    if (result.code == 200) {
        ElMessage.success('删除成功')
    } else {
        ElMessage.error('删除失败')
    }
    getHasRole()
}

let rules = reactive({
    roleName: [{
        required: true,
        trigger: 'blur',
        validator: validateName
    }]
})
const addUser = () => {
    Object.assign(RoleParams, { id: 0, roleName: '' })

    dialogVisible.value = true
    formRef.value.clearValidate('roleName')
}

const updateRole = (row) => {
    Object.assign(RoleParams, { id: 0, roleName: '' })
    dialogVisible.value = true
    RoleParams.id = row.id
    formRef.value.clearValidate('roleName')
}
const save = async () => {
    await formRef.value.validate()
    let result = await reqAddOrUpdateRole(RoleParams)
    if (result.code == 200) {
        ElMessage.success('保存成功')
    } else {
        ElMessage.error('保存失败')
    }
    dialogVisible.value = false
    getHasRole()
    formRef.value.clearValidate('roleName')
}
const cancel = () => {

    dialogVisible.value = false
    formRef.value.clearValidate('roleName')
}
const search = () => {
    getHasRole()
}
const reset = () => {
    LayOutSettingStore.refsh = !LayOutSettingStore.refsh
}
const getHasRole = async () => {
    let result = await reqAllRoleList(pageNo.value, pageSize.value, keyword.value)
    if (result.code === 200) {
        allRole.value = result.data.records
    }


}
onMounted(() => {
    getHasRole()
})
const setPermisstion = async (row) => {
    selcetArr.value = []

    Object.assign(RoleParams, row)

    let result = await reqAllMenuList(RoleParams.id)
    if (result.code == 200) {
        menuArr.value = result.data


        selcetArr.value = filterSelectArr(menuArr.value, [])
  


    }

    drawer.value = true

}
const filterSelectArr = (allData, initArr) => {

    // allData.forEach(item => {
    //     console.log(item);

    // })
    allData.map(item => {
        if (item.children.length) {
            initArr = initArr.concat(filterSelectArr(item.children, []))
        } else if (item.select) {
            {
                initArr.push(item.id)
            }

        }
    })


    return initArr
}





</script>

<style scoped>
.form {
    display: flex;
    justify-content: space-between;
}
</style>