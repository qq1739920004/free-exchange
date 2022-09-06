import { defineStore } from 'pinia'
import loginService from '@/service/login/index'
import type { userDataType } from '@/service/login/type'
import {loginType,userInfoType} from '@/store/login/types';
let userInfo:userInfoType
export const login = defineStore('login',{
  state: () => {
    return {
      userInfo
    }
  },
  actions: {
    //登录接口
    async login(userData: userDataType) {
      const result = await loginService.login(userData)
      this.userInfo=result
      return result
    },
    async register(userData:userDataType){
      const result =await loginService.register(userData)
      return result
    },
     //查看用户是否登录
     async isLogin(){
      const token=localStorage.getItem('token')
      let result
      if(token){
        result=await loginService.isLogin()
        if(!result){
          return false
        }
        this.userInfo={...result,token}
        localStorage.setItem('user',JSON.stringify({...result}))
      }
      return result
    }
  }
}
)
