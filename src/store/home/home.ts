import { defineStore } from 'pinia'
import homeService from '@/service/home/index'
import {getmoments} from '@/store/home/types';
import type { pageType } from '@/service/home/type'
let pageInfo:pageType
let momentsInfo:getmoments[]
let rankingGive:getmoments[]
let rankingCollection:getmoments[]
export const home = defineStore('home',{
  state: () => {
    return {
      momentsInfo,
      arrid:new Set(),
      pageInfo:{
        start:0,
        end:8,
        category:0,
        method:'rand',
      },
      limit:1,

      rankingGive,
      rankingCollection
    }
  },
  actions: {
    //获取多条动态信息
    async getsMoment() {
      console.log(this.pageInfo);
      if(this.pageInfo.category){
        const result = await homeService.getsCategoryMoment(this.pageInfo)
        this.momentsInfo=result
        for(let i=0;i<this.momentsInfo.length;i++){
          this.arrid.add(this.momentsInfo[i].id)
        }
        return result
      }
      else{
        const result = await homeService.getsMoment(this.pageInfo)
        this.momentsInfo=result
        for(let i=0;i<this.momentsInfo.length;i++){
          this.arrid.add(this.momentsInfo[i].id)
        }
        return result
      }

    },
    //下拉加载更多动态
    async addgetsMoment():Promise<getmoments[]>{
      if(this.pageInfo.category){
        const result = await homeService.getsCategoryMoment(this.pageInfo)
        if(!result.length || result.length<5){
          this.limit=0
        }

        for(let i=0;i<result.length;i++){
          if(!this.arrid.has(result[i].id))
          {
            this.arrid.add(result[i].id)
            this.momentsInfo?.push(result[i])
          }
          if(this.momentsInfo?.length===this.pageInfo.end  || (result.length<5 && i==result.length-1 )){
            return result
          }
        }
        return result
      }
      else{
        const result = await homeService.getsMoment(this.pageInfo)

        if(!result.length || result.length<5){
          this.limit=0
        }
        for(let i=0;i<result.length;i++){
          if(!this.arrid.has(result[i].id))
          {
            this.arrid.add(result[i].id)
            this.momentsInfo?.push(result[i])
          }
          if(this.momentsInfo?.length===this.pageInfo.end || (result.length<5 && i==result.length-1 )){
            return result
          }
        }

        if(this.momentsInfo?.length===this.pageInfo.end || (result.length<5)){
          return result
        }else{
            return await this.addgetsMoment()
        }
      }
    },
    //点赞动态，或者点赞评论
  async startGive(momentId:number|string,commentId?:number){
      const result=await homeService.startGive(momentId,commentId)
      return result
  },
  //收藏动态
  async startCollection(momentId:number|string){
    const result=await homeService.startCollection(momentId)
    return result
  },
  //获取收藏或者点赞排行榜数据
  async rankingList(rankingName:string){
    const result = await homeService.getsMoment({
      start:0,
      end:10,
      ranking:rankingName
    })
    if(rankingName==='labelCount'){
      this.rankingGive=result
    }
    else if(rankingName==='collectionCount'){
      this.rankingCollection=result
    }
    return result
  }
    }
}
)

