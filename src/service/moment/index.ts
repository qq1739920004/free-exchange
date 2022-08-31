import {krlrequest} from '../index';
import {mainLabelType} from '@/store/label/types';
import {getmoments} from '@/store/home/types';

enum momentPath{
  getMomentDetail='/moment/',//查看动态详情
}
class momentService{
//请求动态详情
async getMomentDetail(momentId:number){
    return krlrequest.request<getmoments[]>({
      url:momentPath.getMomentDetail+momentId,
      method:'get',
    })
  }
}
export default new momentService
