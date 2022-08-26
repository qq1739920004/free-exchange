import { defineStore } from 'pinia'
import labelService from '@/service/label/index'
import {mainLabelType} from './types';
let mainLabel:mainLabelType[]
export const label = defineStore('label',{
  state: () => {
    return {
      mainLabel
    }
  },
  actions: {
    //登录接口
    async lookMainLabel() {
      const result = await labelService.lookMainLabel()
      this.mainLabel=result
      return result
    },

  }
}
)
