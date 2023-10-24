


export const constantRouter = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "Login",
    meta: {
      title: '登录',
      hidden: true,
      icon: 'User',
    }
  },
  {
    path: "/404",
    component: () => import("@/views/404/index.vue"),
    name: "404",
    meta: {
      title: '404',
      hidden: true,
      icon: 'Close',
    }
  },

  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    name: "Layout",
    meta: {
      title: 'layout',
      hidden: false,

    },
    children: [
      {
        name: "Home",
        path: '/home',
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: '首页',
          hidden: false,
          icon: 'House',
        },
      },
    ]
  },
  // {
  //   path: "/:pathMatch(.*)*",
  //   redirect: '/404',
  //   name: "Any",
  //   meta: {
  //     title: 'Any',
  //     hidden: true,
  //     icon: "Connection"
  //   }
  // },
  {
    path: "/screen",
    name: 'Screen',
    component: () => import('@/views/screen/index.vue'),
    meta: {
      title: '数据大屏',
      hidden: false,
      icon: 'Histogram',
    }
  },
  // {
  //   path: "/acl",
  //   name: 'Acl',
  //   component: () => import('@/layout/index.vue'),
  //   meta: {
  //     title: '权限管理',
  //     hidden: false,
  //     icon: 'Lock',

  //   },
  //   redirect: "/acl/user",
  //   children: [
  //     {
  //       path: "/acl/user",
  //       name: 'User',
  //       component: () => import('@/views/acl/user/index.vue'),
  //       meta: {
  //         title: '用户管理',
  //         hidden: false,
  //         icon: 'UserFilled',
  //       },
  //     },
  //     {
  //       path: "/acl/role",
  //       name: 'Role',
  //       component: () => import('@/views/acl/role/index.vue'),
  //       meta: {
  //         title: '角色管理',
  //         hidden: false,
  //         icon: 'Avatar',
  //       },
  //     },
  //     {
  //       path: "/acl/permission",
  //       name: 'Permission',
  //       component: () => import('@/views/acl/permission/index.vue'),
  //       meta: {
  //         title: '菜单管理',
  //         hidden: false,
  //         icon: 'Tools',
  //       },
  //     },]
  // },

  // {
  //   path: "/product",
  //   component: () => import("@/layout/index.vue"),
  //   name: "Product",
  //   meta: {
  //     title: '商品管理',
  //     hidden: false,
  //     icon: 'Goods',
  //   },
  //   redirect: "/product/trademark",
  //   children: [{
  //     path: "/product/trademark",
  //     component: () => import("@/views/product/trademark/index.vue"),
  //     name: "Trademark",
  //     meta: {
  //       title: '品牌管理',
  //       hidden: false,
  //       icon: 'ShoppingCartFull',
  //     },
  //   }, {
  //     path: "/product/attr",
  //     component: () => import("@/views/product/attr/index.vue"),
  //     name: "Attr",
  //     meta: {
  //       title: '属性管理',
  //       hidden: false,
  //       icon: 'ZoomOut',
  //     },
  //   },
  //   {
  //     path: "/product/spu",
  //     component: () => import("@/views/product/spu/index.vue"),
  //     name: "Spu",
  //     meta: {
  //       title: 'SPU管理',
  //       hidden: false,
  //       icon: 'Calendar',
  //     },
  //   },
  //   {
  //     path: "/product/sku",
  //     component: () => import("@/views/product/sku/index.vue"),
  //     name: "Sku",
  //     meta: {
  //       title: 'SKU管理',
  //       hidden: false,
  //       icon: 'Promotion',
  //     },
  //   }]
  // }
  // 因为除去screen外其他的都是layout的子路由，所以不会跳转到新页面，会在layout页面中进行展示


]
export const asyncRoutes = [
  {
    path: "/acl",
    name: 'Acl',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '权限管理',
      hidden: false,
      icon: 'Lock',

    },
    redirect: "/acl/user",
    children: [
      {
        path: "/acl/user",
        name: 'User',
        component: () => import('@/views/acl/user/index.vue'),
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'UserFilled',
        },
      },
      {
        path: "/acl/role",
        name: 'Role',
        component: () => import('@/views/acl/role/index.vue'),
        meta: {
          title: '角色管理',
          hidden: false,
          icon: 'Avatar',
        },
      },
      {
        path: "/acl/permission",
        name: 'Permission',
        component: () => import('@/views/acl/permission/index.vue'),
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'Tools',
        },
      },]
  },

  {
    path: "/product",
    component: () => import("@/layout/index.vue"),
    name: "Product",
    meta: {
      title: '商品管理',
      hidden: false,
      icon: 'Goods',
    },
    redirect: "/product/trademark",
    children: [{
      path: "/product/trademark",
      component: () => import("@/views/product/trademark/index.vue"),
      name: "Trademark",
      meta: {
        title: '品牌管理',
        hidden: false,
        icon: 'ShoppingCartFull',
      },
    }, {
      path: "/product/attr",
      component: () => import("@/views/product/attr/index.vue"),
      name: "Attr",
      meta: {
        title: '属性管理',
        hidden: false,
        icon: 'ZoomOut',
      },
    },
    {
      path: "/product/spu",
      component: () => import("@/views/product/spu/index.vue"),
      name: "Spu",
      meta: {
        title: 'SPU管理',
        hidden: false,
        icon: 'Calendar',
      },
    },
    {
      path: "/product/sku",
      component: () => import("@/views/product/sku/index.vue"),
      name: "Sku",
      meta: {
        title: 'SKU管理',
        hidden: false,
        icon: 'Promotion',
      },
    }]
  }

]
export const anyRoute = [
  //任意路由
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '任意路由',
      hidden: true,
      icon: 'DataLine',
    },
  }
]
