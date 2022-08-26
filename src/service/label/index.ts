import {krlrequest} from '../index';
import {mainLabelType} from '@/store/label/types';
enum labelPath{
  createdMoment='/label/category',//查看所有主标签
}
class labelService{
  lookMainLabel(){
    return krlrequest.request<mainLabelType[]>({
      url:labelPath.createdMoment,
      method:'get',
    })
  }


}
export default new labelService
