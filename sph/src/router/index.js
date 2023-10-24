import VueRouter from "vue-router"
import store  from "@/store";
import routes from '@/router/routes'
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function(location, resolve, reject){
    if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this,location,()=>{},()=>{})
  }
}
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(this,location,()=>{},()=>{})
  }
}
const router = new VueRouter({
  routes,
    scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  },

})
router.beforeEach(async(to, from, next) => {
  let name =store.state.user.userInfo.name
  let token = store.state.user.token
  next()
  if (token) {
    if (to.path == 'Login') {
      next('/Home')
     
     } else {
       if (name) {
         next()
      
       } else {
         try{
  
         await store.dispatch('getUserInfo')
           next()
         
         }catch(error){
           await store.dispatch("logout")
           next("/Login")
         }
         }
    }
  } else {
    let toPath = to.path
    if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1 )
    {
      next('/Login?redirect='+toPath)
     
   }else{
    next()
   }
  

   
  }
})
export default router