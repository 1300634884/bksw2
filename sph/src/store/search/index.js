
import {reqSeacrhList} from '@/api/index.js'
const state = {searchList:{}}
const actions = {
    async searchList(context,params={}) {
       try{
    let result = await reqSeacrhList(params);
    //  reqCategoryList()为一个promise
        if (result.code == 200) {
          context.commit("SEARCHLIST",result.data)
        }} catch(e){console.log(e);}
    },
}
const mutations = {SEARCHLIST(state,data){ state.searchList=data}}
const getters = {   goodsList(state) {
       return state.searchList.goodsList||[]
    },
    // ||[]没网时返回空数组
    attrsList(state) {
         return state.searchList.attrsList||[]
    }, 
    trademarkList(state) {
        return state.searchList.trademarkList||[]
       
    }
}
export default {
    state,actions,mutations,getters
}