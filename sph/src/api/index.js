import requests from "./request"
import moackrequest from './mockrequest '
export const reqCategoryList = () => {
    return requests({ url: 'product/getBaseCategoryList', method: 'get' })
}
export const getBannerList = () => {
    return moackrequest({ url: '/banner', method: 'get' })
}
export const getFloorList = () => { 
    return moackrequest({ url: '/floor', method: 'get' })
}
export const reqSeacrhList = (params) => {
    return requests({ url: '/list', method: 'post' ,data:params})
}
export const reqGoodsInfo = (skuId) => {
    return requests({url:`/item/${ skuId }`,method:'get'})
}
export const reqAddOrUpdateShopCart= (skuId,skuNum) => {
    return requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
}
export const reqCartList = () => {
    return requests({ url: '/cart/cartList', method: 'get' })
}
export const delCartList = (skuId) => {
    return requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
}
export const switchgoods= (skuId,isChecked) => {
    return requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })
}
export const reqGetCode = (phone) =>{
    return  requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })}
export const registers = (data) => {
    return requests({ url: '/user/passport/register', data,method: 'post' } )
}
export const reqlogin = (data) => {
    return requests({ url: '/user/passport/login', data,method: 'post' } )
}
export const reqUserInfo = () => {
    return requests({ url: '/user/passport/auth/getUserInfo', method: 'get' } )
} 
export const reqlogout = () => {
    return requests({url:"/user/passport/logout",method:"get"})
}
export const reqAddressInfo = () => {
    return  requests({ url: "/user/userAddress/auth/findUserAddressList", method: 'get' })
}
export const reqOrderInfo = () => {
    return requests({ url: '/order/auth/trade', method: "get" })
}
export const reqSubmitOrder = (tradeNo,data) => {
    return requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,data, method: "post" })
}
export const reqPayVx = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: "get" })
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: "get" })
export const reqMyOrderList= (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:"get"})
//  } 请求数据的函数