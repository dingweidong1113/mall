import axios from "axios";

// 因为 instance 本身返回的就是一个 Promise,直接返回即可
 
export function request(config){  
  // 1. 创建 axios 实例 
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 3000
  })

    // 2. 实例拦截
      // 请求拦截
      instance.interceptors.request.use(  
        config => {
          return config;    
        },
        err => {
          console.log(err);
        }
      ); 
      
      // 响应拦截
      instance.interceptors.response.use(
        res => {
          // console.log(res);  // 拦截后可以对请求回来的的 result 进行一些操作再返回

          // 去掉axios自带的一些数据 比如status等，只返回我们需要的 data 数据
            return res.data
        },
        err => {
          console.log(err);
        }
      )

  // 3. 发送真正的网络请求
  return instance(config)
} 
