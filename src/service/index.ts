import KRLrequest from './request/index';
import {BASE_TIME,BASE_URL} from './request/config';
import {KRLconfig} from './request/types'

const krlrequest=new KRLrequest({
  baseURL:BASE_URL,
  timeout:BASE_TIME,
  interceptor:{
    requestInterceptorLaunch:((config:KRLconfig)=>{
      return config
    })
  }
})



export {krlrequest}
