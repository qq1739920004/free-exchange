import {krlrequest} from '../index';
import {createType,pageType} from './type';
import {getmoments} from '@/store/home/types';
enum homePath{
  createdMoment='/moment',//创建动态
  getsMoment='/moment',//查看多条动态
  getsCategoryMoment='/moment/all/category',//请求某一分类的动态
}
class homeService{
  create(createInfo:createType){
    return krlrequest.request({
      url:homePath.createdMoment,
      method:'post',
      data:createInfo,
      // isLoding:true,
    })
  }
  //请求动态
  getsMoment(page:pageType){
    return krlrequest.request<getmoments[]>({
      url:homePath.getsMoment,
      method:'get',
      params:page
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

}
export default new homeService
