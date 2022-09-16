import axios from 'axios';
import type {AxiosInstance,AxiosResponse} from 'axios';
import  {KRLconfig} from './types';
import { ElLoading } from 'element-plus'
import axiosRetry from 'axios-retry';
import {useRouter} from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus'
function axiosretry(instance:AxiosInstance,config:KRLconfig){
  let i=1
  axiosRetry(instance, {//传入axios实例
    retries: 3,              // 设置自动发送请求次数
    retryDelay: (retryCount) => {
      return retryCount * 4000;      // 重复请求延迟（毫秒）
    },
    shouldResetTimeout: true,       //  重置超时时间
    retryCondition: (error) => {
      //true为打开自动发送请求，false为关闭自动发送请求
        if (error.message.includes('timeout') && config.isretry) {
        console.log('网络超时了，重新发送请求');
          console.log(`第${i++}次超时`);
          return true;
        } else {
          return false;
        };
    }
  });
}
class KRLrequest{
  oneloding:number
  instance:AxiosInstance
  isLoding?:boolean
  isdialog?:boolean
  constructor(config:KRLconfig){
    this.oneloding=1
    this.isLoding=false
    this.isdialog=true
    this.instance=axios.create(config)
    axiosretry(this.instance,config)
    // 某个实例的拦截器
    this.instance.interceptors.request.use(config.interceptor?.requestInterceptorLaunch,config.interceptor?.requestInterceptorCatch)
    this.instance.interceptors.response.use(config.interceptor?.responseInterceptorLaunch,config.interceptor?.responseInterceptorCatch)
    // 所有实例都会拥有的拦截器
    //请求拦截
    this.instance.interceptors.request.use(
      (config:KRLconfig)=>{
        return config
      },(err:any)=>{
        return
      }
    )
    //响应拦截
    this.instance.interceptors.response.use(
      (res:AxiosResponse)=>{
        if(res?.statusText!='OK') return
        return res.data
      },(err:any)=>{
        if(err.message.indexOf(401) && this.isdialog){
          this.isdialog=false
          localStorage.removeItem('user')
          localStorage.removeItem('token')
          return false
        }
        console.log(err);
      }
    )
  }
//请求
  request<T>(config:KRLconfig<T>):Promise<T>{
    return new Promise((resolve,reject)=>{
       //加载的组件
       let Loading: any
       //查看是否显示加载图标
      if (config.isLoding) {
        this.isLoding = config.isLoding
      }
      if (this.isLoding) {
       Loading = ElLoading.service({
          lock: true,
          text: '了解真相,才能获得真正的自由',
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
      if (config.isLoding !== undefined) {
        if(this.oneloding){
          setTimeout(() => {
            Loading.close()
            this.isLoding=false
            this.oneloding=0
          }, 3000);
        }
        else if(config.isLoding){
          Loading.close()
          this.isLoding=false
        }

      }
        resolve(res)

      }).catch((err:any)=>{
        reject(err)
      })

    })
  }
}

export default KRLrequest
