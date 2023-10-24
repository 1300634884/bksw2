export interface loginForm {
    username: string,
    password: string

}
// interface dataType {
//     token?: string;
//     message?: string;
// }

export interface ResponseData {
    code: number;
    message: string;
    ok: boolean;

}
export interface userInfoResponseData extends ResponseData {
    data: {
        routes: string[],
        buttons: string[],
        roles: string[],
        avatar: string,
        name: string
    }
}
export interface loginResponseData extends ResponseData {
    data: string;
}

export interface logoinFormData {
    username: string;
    password: string;

}
interface userInfo {
    userId: number,
    avatar: string,
    username: string,
    password: string,
    desc: string,
    roles: string[],
    buttons: string[],
    routes: string[],
    token: string,
}
interface user {
    checkUser: userInfo
}
export interface userResponseData {
    code: number,
    data: user
}