import axios from "axios"
//对axios进行二次封装
//1.利用axios的create方法创造一个axios实例'
import nprogress from "nprogress"
import "nprogress/nprogress.css"
const requests = axios.create({
    baseURL: "/mock",
    timeout: 5000,
    
})
requests.interceptors.request.use((config) => { nprogress.start();  return config }) 
requests.interceptors.response.use((res) => { nprogress.done(); return res.data }, (error) => { return  Promise.reject(new Error('faile'))
    
})
export default requests