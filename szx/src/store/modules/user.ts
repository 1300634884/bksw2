import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user/index'
import type { logoinFormData, loginResponseData, userInfoResponseData } from '@/api/user/type.ts'
import type { UserState } from '@/store/modules/types/types'
import { SET_TOKEN, REMOVE_TOKEN, GET_TOKEN } from '@/utils/toekn'
import { constantRouter, asyncRoutes, anyRoute } from '@/router/router.ts'
import router from '@/router'
import cloneDeep from 'lodash/cloneDeep'
// a是原对象，b是用来对比的

let db = (a, b) => {
    let c = []
    a.map(item => {
        b.map(item2 => {
            if (item.name == item2) {
                c.push(item)
            }
        })
        if (item.children) {
            item.children = db(item.children, b)
        }
    })



    return c

}
let useUserStore = defineStore('User', {
    state: (): UserState => {
        return {
            token: GET_TOKEN(),
            menuRoutes: [],
            username: "",
            avatar: '',
            asyncRoute: [],
            // routes: [],
            buttons: []
        }
    },
    actions: {
        async userLogin(data) {
            let result: loginResponseData = await reqLogin(data)
            if (result.code == 200) {
                SET_TOKEN(result.data as string)
                this.token = (result.data as string)

                return "ok"
            } else {
                return Promise.reject(new Error(result.data))
            }

        },
        async userInfo() {
            let result: userInfoResponseData = await reqUserInfo()
            if (result.code == 200) {
                this.username = result.data.name;
                this.avatar = result.data.avatar
                // this.routes = result.data.routes
                this.asyncRoute = db(cloneDeep(asyncRoutes), result.data.routes)

                this.menuRoutes = anyRoute.concat(constantRouter.concat(this.asyncRoute))
                this.buttons = result.data.buttons
                await this.asyncRoute.forEach((route) => {
                    router.addRoute(route)
                    // 再次调用addRoute会覆盖原先的动态路由
                })

                return "ok"

            } else {

                return Promise.reject(new Error(result.data))
            }

        },
        async userLoyout() {
            let result: any = await reqLogout()
            if (result.code == 200) {
                REMOVE_TOKEN()
                this.token = ''
                this.username = ''
                this.avatar = ''
                return "ok"
            } else {
                return Promise.reject(new Error(result.data))
            }


        }

    },
    getters: {


    },

})
export default useUserStore