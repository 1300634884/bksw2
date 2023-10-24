import request from '@/utils/request'
import type { TradeMarkResponseData } from './type.ts'
enum API {
    TRADEMARK_URL = "/admin/product/baseTrademark/",
    SAVETRADEMARK_URL= "/admin/product/baseTrademark/save",
    UPDATATRADEMARK_URL = "/admin/product/baseTrademark/update",
    DELTARADEMARK_URL = "/admin/product/baseTrademark/remove/"
}
export const reqHasTrademark = (page: number, limit: number) => request.get<any, TradeMarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`)
export const reqTrademark = (data: any) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATATRADEMARK_URL, data) 
    } else {
        return request.post<any, any>(API.SAVETRADEMARK_URL, data)
    }
}
export const delTrademark = (id:number) => {
    return request.delete(API.DELTARADEMARK_URL+`${id}`)
}