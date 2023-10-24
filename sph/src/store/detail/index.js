import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api/index.js"
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodInfo: {},
    uuid_token:getUUID()
   
}
const actions = {
 async getGoodInfo(context,skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code == 200) {
            context.commit('GETGOODINFO',result.data)
        } 
      
    },
    async addOrUpdateShopCart(context, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        if (result.code == 200) {
           return "ok"
        } else {
            return Promise.reject(new Error('faile'))
        }

    
        }
}
const mutations = {
   GETGOODINFO(state,data) {
        state.goodInfo = data
       
    },

}
const getters = {
    categoryView(state) { 
        return state.goodInfo.categoryView||{}
    },
     skuInfo(state) {
        return state.goodInfo.skuInfo||{}
    },
      spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList||[]
    }

}
export default {
    state,actions,mutations,getters
}