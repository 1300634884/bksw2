import { defineStore } from 'pinia'
import { reqHasTrademark } from '@/api/product/trademark/index'
import { GET_TOKEN } from '@/utils/toekn'
import type { ProductRouter } from '@/store/modules/types/types'
import type { TradeMarkStore } from '@/api/product/trademark/type.ts'

let useProductRouter = defineStore('Product', {
    state: (): TradeMarkStore => {
        return {
            page: 1,
            limit: 3,
            token: GET_TOKEN(),
            data: {}
        }
    },
    actions: {
        async HasTrademark(pages: any, limitt: any) {
            let result = await reqHasTrademark(pages, limitt)
            if (result.code == 200) {
                this.page = pages
                this.limit = limitt
                this.data = result.data
                return 'ok'
            } else {
                return Promise.reject(new Error('请求失败'))
            }

        }

    },
    getters: {},

})

export default useProductRouter