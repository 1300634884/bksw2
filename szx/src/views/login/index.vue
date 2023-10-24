<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>hello</h1>
          <h1>欢迎来到尚甄选</h1>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login_btn" type="primary" size="default" @click="login" :loading=loading> 登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user.ts'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus';
import { getTime } from "@/utils/time.ts"
let $route = useRoute()
let loginForm = reactive({
  username: "admin",
  password: "atguigu123"
})
let loading = ref(false)
let $router = useRouter()
let useStore = useUserStore()
const validatorUserName = (rule: any, value: any, callback: any) => {
  if (10 > value.length && value.length > 3) {
    callback()
  } else {
    callback(new Error('长度为3-10'))
  }
}
const validatorPassWord = (rule: any, value: any, callback: any) => {
  if (12 > value.length && value.length > 3) {
    callback()
  } else {
    callback(new Error('长度为3-12'))
  }
}
const login = async () => {
  loading.value = true
  try {
    await useStore.userLogin(loginForm)
    if ($route.query.redirect) {
      $router.push({ path: `${$route.query.redirect}` })
    } else {
      $router.push('/')
    }
    ElNotification(
      {
        type: 'success',
        message: "登录成功",
        title: ` hi${getTime()}好好好 `
      }
    )
    loading.value = false
  }
  catch (error) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message
    })
  }
}
const rules = {
  username: [{ min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur', validator: validatorUserName }],
  password: [{ min: 3, max: 7, message: '长度在 3 到 7 个字符', trigger: 'blur', validator: validatorPassWord }]
}

</script>
<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url("@/assets/images/login_form.png") no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0px;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>