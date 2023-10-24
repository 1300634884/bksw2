export const setToken = (token) => {
   return localStorage.setItem('TOKEN',token)
}
export const getToken = () => {
 return   localStorage.getItem('TOKEN')  //此处return必写
}
export const removeToken=() => {
   return localStorage.removeItem('TOKEN')
}