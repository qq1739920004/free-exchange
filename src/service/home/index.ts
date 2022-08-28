import {krlrequest} from '../index';
import {createType,pageType} from './type';
import {getmoments} from '@/store/home/types';
enum homePath{
  createdMoment='/moment',//创建动态
  getsMoment='/moment',//查看多条动态
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
  getsMoment(page:pageType){
    return krlrequest.request<getmoments[]>({
      url:homePath.getsMoment,
      method:'get',
      params:page
    })
  }

}
export default new homeService
