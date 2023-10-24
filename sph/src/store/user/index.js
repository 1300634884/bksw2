import { setToken,getToken ,removeToken} from '@/utils/token';
import { reqGetCode, registers, reqlogin, reqUserInfo ,reqlogout} from '@/api/index'

const state = { 
    code: '',
    token:getToken(),
    userInfo:{}
}
const actions = {
    async logout({commit}) {
        let result = await reqlogout()
        if (result.code == 200) {
            commit('CLEAR')

            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }

    },
    async getUserInfo({commit}) { 
        let result = await reqUserInfo();
        if (result.code == 200) {
            commit('GETUSERINFO', result.data)
        }

    },
    
    async userLogin({commit},data) {
        let result = await reqlogin(data)
        if (result.code == 200) {
            setToken(result.data.token)
               
                  commit('USERLOGIN', result.data.token)
                  return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
   async getCode({commit},phone) {
        let result = await reqGetCode(phone)
       if (result.code == 200) {
                 console.log(result);
            commit("GETCODE", result.data)
            return "ok"
        } else {
            return Promise.reject(new Error('faile'))
        }
       
    },
    
    async userRegister({ commit }, user) {
        let result = await registers(user)
        
         if (result.code == 200) {
            
            return "ok"
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations = {
    CLEAR(state) {state.code= '',
    state.userInfo={}
        removeToken()
    },
    GETUSERINFO(state,data) {
        return state.userInfo=data
    },
    USERLOGIN(state, data) {
   
        return  state.token=data
     }
    ,
    GETCODE(state, data) {
        
        return state.code = data
        
    }
}
const getters = {}
export default {
    state ,actions,mutations,getters
}