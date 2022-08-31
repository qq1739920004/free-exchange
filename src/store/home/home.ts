import { defineStore } from 'pinia'
import homeService from '@/service/home/index'
import {getmoments} from '@/store/home/types';
import type { pageType } from '@/service/home/type'
let momentsInfo:getmoments[]
export const home = defineStore('home',{
  state: () => {
    return {
      momentsInfo
    }
  },
  actions: {
    //获取多条动态信息
    async getsMoment(pageInfo: pageType) {
      if(pageInfo.category){
        const result = await homeService.getsCategoryMoment(pageInfo)
        this.momentsInfo=result
        return result
      }
      else{
        const result = await homeService.getsMoment(pageInfo)
        this.momentsInfo=result
        return result
      }

    },
    //点赞动态
  async startGive(momentId:number|string){
    const result=await homeService.startGive(momentId)
    return result
  },
  //收藏动态
  async startCollection(momentId:number|string){
    const result=await homeService.startCollection(momentId)
    return result
  }

    }
}
)

