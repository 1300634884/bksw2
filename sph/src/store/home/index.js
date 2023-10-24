import { reqCategoryList, getBannerList ,getFloorList } from '@/api/index.js'

const state = {categoryList:[],bannerList:[],floorList:[]}
const actions = {
    async categoryList(context) {
       try{
    let result = await reqCategoryList();
    //  reqCategoryList()为一个promise
        if (result.code == 200) {
          context.commit("CATEGORYLIST",result.data)
        }} catch(e){console.log(e);}
    },
      async floorList(context) {
       try{
    let result = await getFloorList();
    //  reqCategoryList()为一个promise
        if (result.code == 200) {
          context.commit("FLOORLIST",result.data)
        }} catch(e){console.log(e);}
    },
    async bannerList(context) {
       try{
    let result = await getBannerList();
    //  reqCategoryList()为一个promise
        if (result.code == 200) {
          context.commit("BANNERLIST",result.data)
        }} catch(e){console.log(e);}
}}
const mutations = {
    CATEGORYLIST(state,data) {state.categoryList=data},
    BANNERLIST(state,data) {state.bannerList=data},
    FLOORLIST(state,data){ state.floorList=data}
}
const getters = {}
export default {
    state,actions,mutations,getters
}