import { defineStore } from 'pinia'
import homeService from '@/service/home/index'
import type { pageType } from '@/service/home/type'

export const home = defineStore('home',{
  state: () => {
    return {
    }
  },
  actions: {
    //登录接口
    async getsMoment(pageInfo: pageType) {
      const result = await homeService.getsMoment(pageInfo)
      return result
    },

    }
}
)

