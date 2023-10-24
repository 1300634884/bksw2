import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import VueRouter from "vue-router"
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import { reqCategoryList } from "@/api"
import store from '@/store'
import '@/mock/mockServe.js';
import Swiper from 'swiper'
import Pagination from '@/components/Pagination'
import "swiper/css/swiper.css" 
import * as API from '@/api'
import { Button, MessageBox } from 'element-ui'
import VueLazyload from 'vue-lazyload'
import tp from '../public/images/1.gif'
import '@/plugins/validate'
Vue.component(Button.name,Button)
Vue.component(Pagination.name,Pagination)
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name,Carousel)/*将TypeNav注册为全局组件，以后在其他vue中使用就不用再引入*/ 
reqCategoryList();
Vue.use(VueRouter)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.config.productionTip = false
Vue.use(VueLazyload, {
 
  loading: tp,

})
new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API

  }
}).$mount('#app')
