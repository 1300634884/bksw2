export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}
export interface CategoryObj {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}
export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[]
}
export interface reqAttr {
  code: string,
  message: string,
  data: CategoryData[],
  ok: boolean
}
export interface CategoryData {
  id?: number | string,
  attrName: string,
  categoryId: number | string,
  categoryLevel: number,
  attrValueList: attrValueLists[]
}
export interface attrValueLists {
  id?: number | string,
  valueName: string,
  attrId?: number
}