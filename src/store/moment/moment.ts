import { defineStore } from 'pinia'
import momentService from '@/service/moment/index'
import {getmoments} from '@/store/home/types';
let momentInfo:getmoments
export const moment = defineStore('moment',{
  state: () => {
    return {
      momentInfo
    }
  },
  actions: {
   //查看所有主标签
    async getMomentDetail(momentId:number) {
      const result = await momentService.getMomentDetail(momentId)
      momentInfo=result[0]
      return result[0]
    },

  }
}
)
