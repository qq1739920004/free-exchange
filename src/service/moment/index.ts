import {krlrequest} from '../index';
import {mainLabelType} from '@/store/label/types';
import {getmoments} from '@/store/home/types';
import {commentType} from '@/store/moment/type';

enum momentPath{
  getMomentDetail='/moment/',//查看动态详情
  getComment='/comment/',//请求此动态评论
  createComment='/comment',//评论动态
  createCommentChidren='/comment/',//comment/29/reply
  deleteComment='/comment/' //删除评论 /comment/2
}
class momentService{
//请求动态详情
async getMomentDetail(momentId:number){
    return krlrequest.request<getmoments[]>({
      url:momentPath.getMomentDetail+momentId,
      method:'get',
    })
  }
//请求此动态评论
  async getComment(momentId:number){
    return krlrequest.request<commentType[]>({
      url:momentPath.getComment+momentId,
      method:'get',
    })
  }
  //评论动态
  async createComment(momentId:number,content:string){
    return krlrequest.request({
      url:momentPath.createComment,
      method:'post',
      data:{
        "content":content,
        "momentId":momentId
      }
    })
  }
  //评论评论的评论
  async createCommentChidren(momentId:number,content:string,belong:number,toCommentId:number){
    return krlrequest.request({
      url:`${momentPath.createCommentChidren}${toCommentId}/reply`,
      method:'post',
      data:{
        "content":content,
        "momentId":momentId,
        "belong":belong
      }
    })
  }
  //删除评论
  async deleteComment(commentId:number,momentId:number){
    return krlrequest.request({
      url:momentPath.deleteComment+commentId,
      method:'delete',
      data:{
        "momentId":momentId,
      }
    })
  }
}

export default new momentService
