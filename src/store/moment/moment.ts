import { defineStore } from 'pinia'
import momentService from '@/service/moment/index'
import {getmoments} from '@/store/home/types';
import {commentType} from '@/store/moment/type';
let momentInfo:getmoments
let commentInfos:commentType[]
export const moment = defineStore('moment',{
  state: () => {
    return {
      momentInfo,
      commentInfos
    }
  },
  actions: {
   ////请求文章详情
    async getMomentDetail(momentId:number) {
      const result = await momentService.getMomentDetail(momentId)
      this.momentInfo=result[0]
      return result[0]
    },
    //请求此文章评论
  async getComment(momentId:number){
    const result = await momentService.getComment(momentId)
      this.commentInfos=result
      return result
    },
  //评论文章
  async createComment(momentId:number,content:string){
    const result = await momentService.createComment(momentId,content)
                    await this.getComment(momentId)
      return result
  },
  //评论评论的评论
  async createCommentChidren(momentId:number,content:string,belong:number,toCommentId:number){
    const result = await momentService.createCommentChidren(momentId,content,belong,toCommentId)
                    await this.getComment(momentId)
      return result
  },
  //删除评论
  async deleteComment(commentId:number,momentId:number){
    const result = await momentService.deleteComment(commentId,momentId)
                    await this.getComment(momentId)
      return result
  }
  }
}
)
