<template>
  <div>
    <div class="tabbar-right">
      <el-button type="primary" color='#626aef' :icon="Operation" circle @click="changrefsh"></el-button>
      <el-button type="primary" color='#626aef' :icon="HelpFilled" circle @click="fullScren"></el-button>
      <el-popover placement="top-start" title="主题设置" :width="200" trigger="hover"
        content="this is content, this is content, this is content">
        <el-form>
          <el-form-item label="主题颜色"> <el-color-picker v-model="color" show-alpha :predefine="predefineColors"
              @change="setColor" /></el-form-item>
          <el-form-item label="暗黑模式"> <el-switch v-model="dark" active-icon="MoonNight" inline-prompt
              inactive-icon="Sunny" @change="changeDark" /></el-form-item>
        </el-form>
        <template #reference>
          <el-button type="primary" #626aef :icon="Grid" circle></el-button> </template></el-popover>
      <img :src=userStore.avatar style="width:30px;height: 30px;margin: 0 10px; border-radius:50%;">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userStore.username }}
          <el-icon class="el-icon--right">

            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

    </div>
  </div>
</template>

<script setup lang="ts">
import { Operation, HelpFilled, Grid } from '@element-plus/icons-vue'
import useLayOutSettingStore from '@/store/modules/setting.ts'
import useUserStore from '@/store/modules/user.ts'
import { nextTick, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
let $router = useRouter()
let $route = useRoute()
let userStore = useUserStore()
let SettingStore = useLayOutSettingStore()
let dark = ref(false)
const changeDark = () => {
  let html = document.documentElement
  dark.value ? html.className = 'dark' : html.className = ''
  dark.value ? html.style.backgroundColor = '#191919' : html.style.backgroundColor = '#fff'
}
const setColor = () => {
  const html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
}
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
let fullScren = () => {
  let full = document.fullscreenElement;
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
let changrefsh = () => {
  SettingStore.refsh = false
  nextTick(() => { SettingStore.refsh = false }
  )
}
let logout = async () => {
  await userStore.userLoyout()
  $router.push({ path: '/login', query: { redirect: $route.path } })

}
</script>


<script lang="ts">
export default {
  name: 'setting'
}

</script>
<style scoped>
.tabbar-right {


  display: flex;
  align-items: center;

}
</style>