import type {AxiosResponse,AxiosRequestConfig} from 'axios';

interface KRLinterceptor<T=AxiosResponse>{
  requestInterceptorLaunch?:(config:AxiosRequestConfig)=>AxiosRequestConfig
  requestInterceptorCatch?:(err:any) => any
  responseInterceptorLaunch?:(config:T)=>T
  responseInterceptorCatch?:(err:any) => any
}

interface KRLconfig<T=AxiosResponse> extends AxiosRequestConfig{
  interceptor?:KRLinterceptor<T>
  isLoding?:boolean,
  isretry?:boolean
}


export{KRLconfig,KRLinterceptor}
