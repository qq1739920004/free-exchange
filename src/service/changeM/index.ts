import {krlrequest} from '../index';
import {createInfoType,setHtmlType,setTitleType} from '@/store/createM/types';
enum changeMPath{
  getMoment='/moment/'
}
class changeMService{
  //获取文章详情
  getMoment(id:number){
    return krlrequest.request<createInfoType[]>({
      url:changeMPath.getMoment+id,
      method:'get',
    })
  }
  //内容变化
  setTempContent(tempId:string|number,content:setHtmlType){
    return krlrequest.request({
      url:`/moment/${tempId}`,
      method:'post',
      data:content,
    })
  }
  //标题变化
  setTempTitle(tempId:string|number,content:setTitleType){
    return krlrequest.request({
      url:`/moment/title/${tempId}`,
      method:'post',
      data:content,
    })
  }


}
export default new changeMService
