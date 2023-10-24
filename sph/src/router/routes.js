import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import pay from '@/pages/Pay'
import paySuccess from '@/pages/PaySuccess'

import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'

export default [
        { // 配置默认路由
               path:"/", // 路由地址
               redirect:"/Home" // 重定向
  },
    {path:"/Center",
    name: 'Center',
    component:()=>import('@/pages/Center'),
      meta: { show: true },
      children: [{
        path: "/Center",
         redirect:"/Center/myOrder"
      },
    
      {path:"myOrder",
    name: 'myOrder ',
        component: myOrder ,meta: { show: true }
      },
      {
        path: "groupOrder",
    name: 'groupOrder',
    component: groupOrder,meta: { show: true }}
    ]
  },{
    path: "/paySuccess",
    name: 'paySuccess',
    component: paySuccess,
    meta:{show:true}
  },
  {path:"/Pay",
    name: 'Pay',
    component: pay,
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from == '/Trade') {
        next
      } else {
        next(false)
      }
    }
    
  },
  {
    path: "/Trade",
    name: "Trade",
    component:Trade,
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/ShopCart') {
        next()
      } else {
        next(false)
      }

    }
       },
         {
            name:"ShopCart",
            path: "/ShopCart", 
            component:ShopCart,
           meta: { show: true }
            
            
        },
      {
            name:"AddCartSuccess",
            path: "/AddCartSuccess", 
            component: AddCartSuccess,
            meta:{show:true}
            
        },
        {   name:"Home",
            path: '/Home',
            component: ()=>import('@/pages/Home'),     //路由懒加装
            meta: {show: true}
                                    
        },
         {    
            path: '/Login',
             component: Login,
              meta: { show: true}                  
        },
          // {    path: '/Search/:keyword', 传query参数时使用
    {
             path: '/Search/:keyword',  
            component: Search,   
            name: 'Search',
            /*props: { a:1},*/
          /*  props: ($route) => {
              return { keyword: $route.params.keyword（此处的params也可以改为query） }                
             },props传参是通过routerlink中的to："{name ：,params:{}}" 或者是此处写的方式也可以，使用时Search组件中props：[keyword]注册后即可写<keyword></keyword>*/
           
              meta: {show: false}
        },
           {   
            path: '/Register',
               component: Register, 
            meta: {show: false}
            },
    {
      path: '/Detail/:skuid', //传params参数需要加:占位
      
      component: Detail,
      meta:{show:true}
              
            }

    ]    