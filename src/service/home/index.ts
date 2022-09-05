import {krlrequest} from '../index';
import {createType,pageType} from './type';
import {getmoments} from '@/store/home/types';
enum homePath{
  createdMoment='/moment',//创建动态
  getsMoment='/moment',//查看多条动态
  getsCategoryMoment='/moment/all/category',//请求某一分类的动态
  startGive='/give/',//点赞
  startCollection='/collection'//收藏
}
class homeService{
  create(createInfo:createType){
    return krlrequest.request({
      url:homePath.createdMoment,
      method:'post',
      data:createInfo,
    })
  }
  //请求动态
  getsMoment(page:pageType){
    return krlrequest.request<getmoments[]>({
      url:homePath.getsMoment,
      method:'get',
      params:page,
      isLoding:true

    })
  }
  //请求某一分类的动态
  getsCategoryMoment(page:pageType){
    return krlrequest.request<getmoments[]>({
      url:homePath.getsCategoryMoment,
      method:'get',
      params:page
    })
  }
  //点赞动态
  startGive(momentId:number|string,commentId?:number | undefined){
    if(commentId){
      return krlrequest.request({
        url:homePath.startGive+momentId,
        method:'post',
        data:{
          "commantId":commentId
        }
      })
    }else{
      return krlrequest.request({
        url:homePath.startGive+momentId,
        method:'post',
      })
    }

  }
  //收藏动态
  startCollection(momentId:number|string){
    return krlrequest.request({
      url:homePath.startCollection,
      method:'post',
      data:{
        "momentId":momentId
      }
    })
  }

}
export default new homeService
