import { defineStore } from 'pinia'
import loginService from '@/service/login/index'
import type { userDataType } from '@/service/login/type'

export const loginStore = {
  state: () => {
    return {
      userid: '',
      password: ''
    }
  },
  actions: {
    //登录接口
    async login(userData: userDataType) {
      const result = await loginService.login(userData)
      console.log(result);
      return result
    },
    async register(userData:userDataType){
      const result =await loginService.register(userData)
      return result
    }
  }
}
