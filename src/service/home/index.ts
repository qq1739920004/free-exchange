import {krlrequest} from '../index';
import {createType,pageType} from './type';
import {getmoments,getRanking} from '@/store/home/types';
enum homePath{
  createdMoment='/moment',//创建文章
  getsMoment='/moment',//查看多条文章
  getsCategoryMoment='/moment/all/category',//请求某一分类的文章
  startGive='/give/',//点赞
  startCollection='/collection',//收藏
  getRanking='/ranking'
}
class homeService{
  create(createInfo:createType){
    return krlrequest.request({
      url:homePath.createdMoment,
      method:'post',
      data:createInfo,
    })
  }
  //请求文章
  getsMoment(page:pageType,isLoding=false,isretry=false){
    return krlrequest.request<getmoments[]>({
      url:homePath.getsMoment,
      method:'get',
      params:page,
      isLoding:isLoding,
      isretry:isretry
    })
  }
  //请求某一分类的文章
  getsCategoryMoment(page:pageType,isLoding=false,isretry=false){
    return krlrequest.request<getmoments[]>({
      url:homePath.getsCategoryMoment,
      method:'get',
      params:page,
      isLoding:isLoding,
      isretry:isretry
    })
  }
  //点赞文章
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
  //收藏文章
  startCollection(momentId:number|string){
    return krlrequest.request({
      url:homePath.startCollection,
      method:'post',
      data:{
        "momentId":momentId
      }
    })
  }
  //查看排行榜
  getRanking(page:pageType){
    console.log(page);
    return krlrequest.request<getRanking[]>({
      url:homePath.getRanking,
      method:'get',
      params:page
    })
  }

}
export default new homeService
