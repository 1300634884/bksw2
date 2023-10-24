import { createApp } from 'vue'
import 'virtual:svg-icons-register'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
import '@/styles/index.scss'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import SvgIcon from "@/components/SvgIcon/index.vue"
import gloablComponent from './components/index';
import router from '@/router/index.ts'
import pinia from './store/index'
import "./permisstion"
import 'element-plus/theme-chalk/dark/css-vars.css'
import { isHasButton } from './directive/has'
const app = createApp(App)
isHasButton(app)

app.use(pinia)
app.use(gloablComponent);
app.component('SvgIcon', SvgIcon)
app.use(router)
app.use(ElementPlus, {
    locale: zhCn
})

app.mount('#app')



