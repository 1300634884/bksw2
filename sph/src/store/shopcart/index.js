import {reqCartList,delCartList,switchgoods} from '@/api/index.js'
const state = {cartList:[]}
const actions = {
    async getCartList(context) {
    let result = await reqCartList()
  
          if (result.code == 200) {
          context.commit("GETCARTLIST",result.data)
        }
  },
  updateAllCartIsChecked({ dispatch, state }, isChecked) {
    state.cartList[0].cartInfoList.forEach((item)=> {console.log(isChecked);
      dispatch('updateChecked',{ skuId:item.skuId, isChecked })
    })
  
    
  },
  async delcartList(context,skuId) {
    let result = await delCartList(skuId)
    if (result.code == 200) {
         return 'ok'
    } else {
       return Promise.reject(new Error('faile'))
        }
    
  },
  async updateChecked(context, { skuId, isChecked }) {
 let  result = await switchgoods(skuId,isChecked)
    if (result.code == 200) {
         return 'ok'
    } else {
       return Promise.reject(new Error('faile'))
        }
    
    

  }

}
const mutations = {
    GETCARTLIST(state,data) {
      state.cartList=data
    }
}
const getters = {
  cartList() {
  return state.cartList[0]||{}
}
}
export default {
 state,actions,mutations,getters
}