import {krlrequest} from '../index';

import {userDataType} from './type';
import {userInfoType} from '@/store/login/types';
enum loginPath{
  login='/login',
  register='/users',
  isLogin='/ooo',
}
class loginService{
  login(userData:userDataType){
    return krlrequest.request({
      url:loginPath.login,
      method:'post',
      data:userData,
      // isLoding:true,
     interceptor:{
        responseInterceptorLaunch:(res:any)=>{
          if(res.token){
            const {id,name,token,path,nameTure,introduce}=res
            localStorage.setItem('token',token)
            localStorage.setItem('user',JSON.stringify({id,name,path,nameTure,introduce}))
          }
         return res
        }
      }
    })
  }
  register(userData:userDataType){
    return krlrequest.request({
      url:loginPath.register,
      method:'post',
      data:userData,
    })
  }
  isLogin(){
    return krlrequest.request<userInfoType>({
      url:loginPath.isLogin,
      method:'get',
      isdialog:true
    })
  }

}
export default new loginService


