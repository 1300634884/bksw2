import router from "./router";
import { GET_TOKEN } from '@/utils/toekn'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from '@/store/modules/user.ts'
import setting from "../setting"
import { nextTick } from "vue"

router.beforeEach(async (to: any, from: any, next: any) => {
    let userStore = useUserStore()
    let token = GET_TOKEN()
    nprogress.start()
    if (to.path != "/login") {
        if (token) {
            if (userStore.username) {
                next()
            } else {
                try {
                    await userStore.userInfo();
                    next({ ...to, replace: true })

                    // 动态路由还没添加成功就匹配完了
                    // nextTick(next({ ...to, replace: true }))


                } catch (error) {
                    await userStore.userLoyout()
                    next({ path: '/login', query: { redirect: to.path } })
                }
            }
        } else {
            next({ path: '/login', query: { redirect: to.path } })
        }
    } else {
        if (!token) {
            next()
        } else {
            next({ path: from.path })
        }
    }





})

router.afterEach((to: any, from: any) => {
    nprogress.done()
    document.title = setting.title + to.meta.title
})

