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
    async login(userData: userDataType) {
      const result = await loginService.login(userData)
      console.log(result);
    }
  }
}
