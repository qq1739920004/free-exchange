import {krlrequest} from '../index';
import {createInfoType,setHtmlType,setTitleType,mainLabelType} from '@/store/createM/types';
import {createM} from '@/store/createM/createM';
enum createMPath{
  getTemp='/tempmoment/look/userTemp',//产看用户上次编辑的动态
  createTemp='/tempmoment'
}
class createMService{
  //创建伪动态
  createTemp(){
    return krlrequest.request({
      url:createMPath.createTemp,
      method:'post',
      data:{
        title:'请输入您的标题',
        content:'点击全屏创作会体验更好哦'
      }
    })
  }

  //获取用户伪动态
  getTemp(){
    return krlrequest.request<createInfoType[]>({
      url:createMPath.getTemp,
      method:'get',
    })
  }
  //内容变化
  setTempContent(tempId:string|number,content:setHtmlType){
    const createMStore=createM()
    return krlrequest.request({
      url:`/tempmoment/${tempId}`,
      method:'post',
      data:content,
      interceptor:{
        requestInterceptorLaunch:(config:any)=>{
          createMStore.textValue='正在保存......'
          return config
        },
        responseInterceptorLaunch:(res:any)=>{
          createMStore.textValue='保存成功~'
          return res
        },
        responseInterceptorCatch(err:any) {
          createMStore.textValue='保存失败!'
          console.log(err);
        },
      }
    })
  }
  //标题变化
  setTempTitle(tempId:string|number,content:setTitleType){
    const createMStore=createM()
    return krlrequest.request({
      url:`/tempmoment/title/${tempId}`,
      method:'post',
      data:content,
      interceptor:{
        requestInterceptorLaunch:(config:any)=>{
          createMStore.textValue='正在保存......'
          return config
        },
        responseInterceptorLaunch:(res:any)=>{
          createMStore.textValue='保存成功~'
          return res
        },
        responseInterceptorCatch(err:any) {
          createMStore.textValue='保存失败!'
          console.log(err);
        },
      }
    })
  }
  //清空文章
  deleteTemp(tempId:string|number){
    return krlrequest.request({
      url:`/tempmoment/${tempId}`,
      method:'delete'
    })
  }
  //伪动态转真动态
  tempBecome(tempId:string|number,mainInfo:mainLabelType){
    return krlrequest.request<number|string>({
      url:`/tempmoment/offer/${tempId}`,
      method:'post',
      data:mainInfo
    })
  }
  //给动态添加标签
async addLabel(tempId:string|number,label:any){
  return krlrequest.request({
    url:`/moment/${tempId}/label`,
    method:'post',
    data:label
  })
  }


}
export default new createMService
