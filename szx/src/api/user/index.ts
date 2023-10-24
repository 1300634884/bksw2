import request from '@/utils/request'
import type { logoinFormData, loginResponseData, } from './type'
enum API {
    LOGIN_URL = "/admin/acl/index/login",
    USERINFO_URL = '/admin/acl/index/info',
    LOGOUT_URL = "/admin/acl/index/logout"
}
export const reqLogin = (data: logoinFormData) => request.post<loginResponseData>(API.LOGIN_URL, data)
export const reqUserInfo = () =>
    request.get<any, any>(API.USERINFO_URL)
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
