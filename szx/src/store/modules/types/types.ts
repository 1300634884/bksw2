import type { RouteRecord } from "vue-router";
export interface UserState {
    token: string | null;
    menuRoutes: RouteRecord[];
    username: string,
    avatar: string
}
export interface ProductRouter {
    page: number,
    limit: number,
    token: string | null,
    data: {
        records: [],
        total: number,
        size: number,
        current: number,
        orders: [],
        optimizeCountSql: boolean,
        hitCount: boolean,
        countId: null,
        maxLimit: null,
        searchCount: boolean,
        pages: number


    }
}
export interface Category {
    c1Id: string
    c2Id: string
    c3Id: string
    C1names: []
    C2names: [],
    C3names: [],
}
