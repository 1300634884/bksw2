export interface TrademarK {
    id?: number;
    tmName?: string;
    logoUrl: string;
}
export interface ResponseData {
    code: number;
    message: string,
    ok: boolean
}
export interface Image {
    id: number;
    spuId: number;
    imgName: string;
    imgUrl: string;

}
export interface saleAttrValue {
    id?: number
    spuid: number,
    baseSaleAttrId: number,
    saleAttrValueName: string,
    saleAttrName: string,

}
export interface saleAttr {
    id?: number
    spuid: number,
    baseSaleAttrId: number,
    saleAttrValueName: string,
    saleAttrName: string,
    spuSaleAttrValueList: saleAttrValue[]
}
export interface HasSaleAttr {
    id: number,
    name: string,
}
export interface HasSaleAttrRespoense extends ResponseData {
    data: HasSaleAttr[]
}

export interface SaleAttrResponse extends ResponseData {
    data: saleAttr[]
}

export interface AllTrademark extends ResponseData {
    data: TrademarK[]
}
export interface spuImage extends ResponseData {
    data: Image[]
}
