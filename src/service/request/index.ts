import axios from 'axios';
import type {AxiosInstance,AxiosResponse} from 'axios';
import  {KRLconfig} from './types';
import { ElLoading } from 'element-plus'

class KRLrequest{
  instance:AxiosInstance
  isLoding?:boolean
  constructor(config:KRLconfig){
    this.isLoding=false
    this.instance=axios.create(config)
    // 某个实例的拦截器
    this.instance.interceptors.request.use(config.interceptor?.requestInterceptorLaunch,config.interceptor?.requestInterceptorCatch)
    this.instance.interceptors.response.use(config.interceptor?.responseInterceptorLaunch,config.interceptor?.responseInterceptorCatch)
    // 所有实例都会拥有的拦截器
    //请求拦截
    this.instance.interceptors.request.use(
      (config:KRLconfig)=>{
        return config
      },(err:any)=>{
        console.log('请求出现错误');
      }
    )
    //响应拦截
    this.instance.interceptors.response.use(
      (res:AxiosResponse)=>{
        if(res.statusText!='OK') return
        return res.data
      },(err:any)=>{
        console.log('请求出现错误');
      }
    )
  }
//请求
  request<T>(config:KRLconfig<T>):Promise<T>{
    return new Promise((resolve,reject)=>{
       //加载的组件
       let Loading: any
       //查看是否显示加载图标
      if (config.isLoding === true) {
        this.isLoding = config.isLoding
      }
      if (this.isLoding) {
       Loading = ElLoading.service({
          lock: true,
          text: 'Loading...',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      }
      //单独请求的拦截器(这个拦截器是我们实现类似拦截器的一个功能而已,不是axios的)
      if(config.interceptor?.requestInterceptorLaunch){
        config=config.interceptor.requestInterceptorLaunch(config)
      }
      this.instance.request<any,T>(config).then((res:T)=>{
        //响应拦截
      if(config.interceptor?.responseInterceptorLaunch){
        res=config.interceptor.responseInterceptorLaunch(res)
      }
      if (config.isLoding === true) {
        setTimeout(() => {
          Loading.close()
        }, 3000)
      }
        resolve(res)

      }).catch((err:any)=>{
        reject(err)
      })

    })
  }
}

export default KRLrequest
