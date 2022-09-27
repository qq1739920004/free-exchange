import {krlrequest} from '../index';
import {createInfoType,setHtmlType,setTitleType,mainLabelType} from '@/store/createM/types';
import {createM} from '@/store/createM/createM';
import {storeToRefs} from 'pinia';
enum createMPath{
  getTemp='/tempmoment/look/userTemp',//产看用户上次编辑的文章
  createTemp='/tempmoment'
}
class createMService{
  //创建伪文章
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

  //获取用户伪文章
  getTemp(){
    return krlrequest.request<createInfoType[]>({
      url:createMPath.getTemp,
      method:'get',
    })
  }
  //内容变化
  setTempContent(tempId:string|number,content:setHtmlType){
    const createMStore=createM()
    const {isSave}=storeToRefs(createMStore)
    return krlrequest.request({
      url:`/tempmoment/${tempId}`,
      method:'post',
      data:content,
      interceptor:{
        requestInterceptorLaunch:(config:any)=>{
          createMStore.textValue='正在保存......'
          isSave.value=true
          return config
        },
        responseInterceptorLaunch:(res:any)=>{
          createMStore.textValue='保存成功~'
          isSave.value=true
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
    const {isSave}=storeToRefs(createMStore)
    return krlrequest.request({
      url:`/tempmoment/title/${tempId}`,
      method:'post',
      data:content,
      interceptor:{
        requestInterceptorLaunch:(config:any)=>{
          createMStore.textValue='正在保存......'
          isSave.value=true
          return config
        },
        responseInterceptorLaunch:(res:any)=>{
          createMStore.textValue='保存成功~'
          isSave.value=true
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
  //伪文章转真文章
  tempBecome(tempId:string|number,mainInfo:mainLabelType,image:string[]){
    mainInfo.image=image
    return krlrequest.request<number|string>({
      url:`/tempmoment/offer/${tempId}`,
      method:'post',
      data:mainInfo
    })
  }
  //给文章添加标签
async addLabel(tempId:string|number,label:any){
  return krlrequest.request({
    url:`/moment/${tempId}/label`,
    method:'post',
    data:label
  })
  }


}
export default new createMService
