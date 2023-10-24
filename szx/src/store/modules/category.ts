
import { defineStore } from "pinia";

import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
import { Category } from '@/store/modules/types/types.ts'

let useCateGoryStore = defineStore("categoryStore", {
    state: (): Category => {
        return {
            c1Id: "",
            c2Id: "",
            c3Id: "",
            C1names: [],
            C2names: [],
            C3names: [],

        }

    },
    actions: {
        async getC1() {

            let result = await reqC1()
            if (result.code === 200) {
                this.C1names = result.data
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
        async getC2() {
            this.c2Id = ""
            this.c3Id = ""
            this.C2names = []
            this.C3names = []
            let result = await reqC2(this.c1Id)
            if (result.code === 200) {

                this.C2names = result.data
                return 'ok'


            } else {
                return Promise.reject(new Error(result.message))
            }
        },
        async getC3() {

            this.c3Id = ""

            this.C3names = []
            let result = await reqC3(this.c2Id)

            if (result.code === 200) {
                this.C3names = result.data
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }
        }
    },
    getters: {}
})
export default useCateGoryStore