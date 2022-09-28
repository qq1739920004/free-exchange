import KRLrequest from './request/index';
import {BASE_TIME,BASE_URL} from './request/config';
import {KRLconfig} from './request/types'

const krlrequest=new KRLrequest({
  baseURL:BASE_URL,  //'http://43.138.xxx.xxx:8888'
  timeout:BASE_TIME,// 4000 请求超时时间
  interceptor:{  //拦截器
    requestInterceptorLaunch:((config:KRLconfig)=>{
      const token=localStorage.getItem('token')
      if(token){
        if(config.headers){
          config.headers.Authorization=token //把token携带在每个请求里面
        }
      }
      return config
    })
  }
})

export {krlrequest}
