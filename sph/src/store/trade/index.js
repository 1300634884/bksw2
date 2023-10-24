import { reqAddressInfo,reqOrderInfo } from '@/api/index'
const state={
    addressInfo: [],
    orderInfo:{}
}
const actions = {
    async getOrderInfo({commit}) {
        let result = await reqOrderInfo()

        if (result.code == 200) {
            commit('GETORDERINFO', result.data)
            return 'ok'
        }else {
            return Promise.reject(new Error('faile'))
          }
    },
    async getUserAddress({ commit }) {
        let result = await reqAddressInfo()
        
        if (result.code == 200) {
            commit('GETUSERADDRESS', result.data)
            return 'ok'
        }else {
            return Promise.reject(new Error('faile'))
          }
   
    }
}
const mutations = {
    GETORDERINFO(state,data){return state.orderInfo=data},
    GETUSERADDRESS(state, data) {
        return state.addressInfo=data
    
}}
const getters = {}
export default {
    actions ,state,mutations,getters
}