import request from "@/utils/request";
import { CategoryResponseData, reqAttr, CategoryData } from '@/api/product/attr/type'


enum API {
    C1_URL = "/admin/product/getCategory1",
    C2_URL = "/admin/product/getCategory2/",
    C3_URL = "/admin/product/getCategory3/",
    ATTR_URL = "/admin/product/attrInfoList/",
    ADDORUPDATEATTR_URL = "/admin/product/saveAttrInfo",
    DELETEATTR_URL = "/admin/product/deleteAttr/",

}

export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL);
export const reqC2 = (c1id: number | string) => request.get<any, CategoryResponseData>(API.C2_URL + c1id);
export const reqC3 = (c2id: number | string) => request.get<any, CategoryResponseData>(API.C3_URL + c2id);
export const reqattr = (c1id: number | string, c2id: number | string, c3id: number | string) => request.get<any, reqAttr>(API.ATTR_URL + `${c1id}/${c2id}/${c3id}`)
export const addOrUpdateAttr = (data: CategoryData) => request.post(API.ADDORUPDATEATTR_URL, data)
export const reqRemoveAttr = (attrId: number | string) => request.delete(API.DELETEATTR_URL + attrId)
