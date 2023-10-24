<template>
    <el-card style="margin: 10px;">
        <el-form :inline="true" class="form">
            <el-form-item label="用户名:">
                <el-input style="width: 200px;" placeholder="请输入用户名" v-model="keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :disabled="!keyword" @click="Search"> 搜索</el-button>
                <el-button @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px;">
        <el-button icon="plus" type="primary" @click="addUser">添加</el-button>
        <el-button icon="plus" type="danger" style="margin: 10px;" @click="deleteSelectUser"
            :disabled="selectIdArr.length ? 0 : 1">批量删除</el-button>
        <el-table @selection-change="selectChange" style="margin: 10px 0px;" border :data="userArr">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column label="#" align="center" type="index"></el-table-column>
            <el-table-column label="ID" align="center" prop="id"></el-table-column>
            <el-table-column label="用户名字" align="center" prop="username" show-overflow-tooltip></el-table-column>
            <el-table-column label="用户名称" align="center" prop="name" show-overflow-tooltip></el-table-column>
            <el-table-column label="用户角色" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="300px" align="center">
                <template #="{ row, $index }">
                    <el-button type="primary" size="small" icon="User" @click="setRole(row)">分配角色</el-button>
                    <el-button type="primary" size="small" icon="Edit" @click="updateUser(row)">编辑</el-button>
                    <el-popconfirm :title="`你确定要删除${row.username}?`" width="260px" @confirm="deleteUser(row.id)">
                        <template #reference>
                            <el-button type="primary" size="small" icon="Delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]" background
            layout="prev, pager, next, jumper,->,total, sizes," :total="total" @size-change="handle"
            @current-change="getHasUser" />
    </el-card>
    <el-drawer v-model="drawer">
        <template #header>
            <h4>{{ userParams.id ? '更新用户' : '添加用户' }}</h4>
        </template>
        <template #default>
            <el-form :model='userParams' :rules="rules" ref="formRef">
                <el-form-item label="用户姓名" prop="username">
                    <el-input placeholder="请填写用户名字" v-model="userParams.username"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" prop="name">
                    <el-input placeholder="请填写用户昵称" v-model="userParams.name"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="password" v-show="!userParams.id">
                    <el-input placeholder="请填写用户密码" v-model="userParams.password"></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <el-button type="primary" @click="save">确定</el-button>
            <el-button @click="cancel">取消</el-button>
        </template>
    </el-drawer>
    <el-drawer v-model="drawer1" title="分配用户角色">
        <template #default>
            <el-form>
                <el-form-item label="用户姓名"> <el-input placeholder="请填写用户姓名"
                        v-model="userParams.username"></el-input></el-form-item>
                <el-form-item label="职位列表">
                    <el-checkbox label="全选" style="margin: 5px;" v-model="checkAll" :indeterminate="isIndeterminate"
                        @change="handleCheckAllChange" />
                    <el-checkbox-group v-model="userRole" border style="margin: 5px;" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="( role, index ) in  allRole " :key="role.id" :label="role">{{ role.roleName
                        }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <el-button type="primary" @click="confirmClick">确定</el-button>
            <el-button @click="cancel">取消</el-button>
        </template>
    </el-drawer>
</template>

<script setup lang="ts">
import { reqUserInfo, reqAddOrUpdateUser, reqAllRole, reqSetUserRole, reqRemoveUser, reqSelectUser } from '@/api/acl/user'
import { Search } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { reactive, nextTick } from 'vue';
import { ref, onMounted } from 'vue';
import useLayOutSettingStore from '@/store/modules/setting.ts'
let pageNo = ref(1)
let pageSize = ref(5)
let total = ref(40)
let layOutSettingStore = useLayOutSettingStore()
let userParams = reactive({
    username: '',
    name: '',
    password: '',
})
let checkAll = ref(false)
let formRef = ref()
let userArr = ref([])
let drawer = ref(false)
let drawer1 = ref(false)
let allRole = ref([])
let userRole = ref([])
let selectIdArr = ref([]);
let isIndeterminate = ref(false)
let keyword = ref('')
const deleteUser = async (id) => {
    let result = await reqRemoveUser(id)
    if (result.code === 200) {
        ElMessage.success('删除成功')
    } else {
        ElMessage.error('删除失败')
    }
    getHasUser()

}
const reset = () => {
    layOutSettingStore.refsh = !layOutSettingStore.refsh
}
const Search = async () => {
    getHasUser()


}
const handleCheckedCitiesChange = (value) => {
    const checkedCount = value.length


    // value为收集到的信息
    // checkAll全选是否打勾
    checkAll.value = checkedCount === allRole.value.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < allRole.value.length
}
const handleCheckAllChange = (val) => {
    userRole.value = val ? allRole.value : []
    isIndeterminate.value = false
}
const validatorUsername = (rule, value, callBack) => {
    if (value.trim().length > 3) {
        callBack()
    } else {
        callBack(new Error('用户名至少为3'))
    }

}

const deleteSelectUser = async () => {

    let idList = selectIdArr.value.map(item => item.id)
    let result = await reqSelectUser(idList)
    if (result.code === 200) {
        ElMessage.success('删除成功')
    } else {
        ElMessage.error('删除失败')
    }
    getHasUser()
}
const confirmClick = async () => {

    let data = {
        roleIdList: userRole.value.map(item => item.id),
        userId: userParams.id,
    }
    let result = await reqSetUserRole(data)
    if (result.code == 200) {
        ElMessage({ type: 'success', message: '职位分配成功' })
    } else {
        ElMessage({ type: 'error', message: '职位分配失败' })
    }
    drawer1.value = false
    Object.assign(userParams, {
        id: 0,
        username: '',
        name: '',
        password: ''
    })


}
const validatorName = (rule, value, callBack) => {
    if (value.trim().length > 2) {
        callBack()
    } else {
        callBack(new Error('昵称至少为2'))
    }

}
const validatorPassword = (rule, value, callBack) => {
    if (value.trim().length > 5) {
        callBack()
    } else {
        callBack(new Error('用户名至少为5'))
    }

}
const rules = {
    username: [{
        required: true,
        trigger: 'blur',
        validator: validatorUsername
    }],
    name: [{
        required: true,
        trigger: 'blur',
        validator: validatorName
    }],
    password: [{
        required: true,
        trigger: 'blur',
        validator: validatorPassword
    }]
}
const cancel = () => {
    drawer.value = false
    drawer1.value = false
    Object.assign(userParams, {
        id: 0,
        username: '',
        name: '',
        password: ''
    })

}
const save = async () => {
    await formRef.value.validate()
    let result = await reqAddOrUpdateUser(userParams)
    if (result.code == 200) {
        drawer.value = false
        ElMessage({ type: 'success', message: userParams.id ? '更新成功' : '添加成功' })
        window.location.reload()
    } else {
        drawer.value = false
        ElMessage({ type: 'error', message: userParams.id ? '更新失败' : '添加失败' })
    }
    getHasUser()
    window.location.reload()
}
const updateUser = (row) => {
    drawer.value = true
    Object.assign(userParams, row)
    nextTick(() => {
        formRef.value.clearValidate('username')
        formRef.value.clearValidate('name')
        formRef.value.clearValidate('password')
    })
}
const selectChange = (value) => {
    selectIdArr.value = value
}
const getHasUser = async (pager = 1) => {
    pageNo.value = pager
    let result = await reqUserInfo(pageNo.value, pageSize.value, keyword.value)
    total.value = result.data.total
    userArr.value = result.data.records
}
const setRole = async (row) => {
    let result = await reqAllRole(row.id)
    if (result.code == 200) {
        allRole.value = result.data.allRolesList
        userRole.value = result.data.assignRoles
        userParams.id = row.id
        userParams.username = row.username
    }
    drawer1.value = true
}
const addUser = () => {
    Object.assign(userParams, {
        id: 0,
        username: '',
        name: '',
        password: ''
    })
    drawer.value = true
    nextTick(() => {
        formRef.value.clearValidate('username')
        formRef.value.clearValidate('name')
        formRef.value.clearValidate('password')
    })
}
const handle = () => {
    getHasUser()
}
onMounted(() => {
    getHasUser()
})
</script>

<style scoped>
.form {
    display: flex;
    justify-content: space-between;
}
</style>