import {krlrequest} from '../index';

import {userDataType} from './type';

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
            localStorage.setItem('token',res.token)
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
      data:userData
    })
  }
  isLogin(userData:userDataType){
    return krlrequest.request({
      url:loginPath.register,
      method:'post',
      data:userData
    })
  }

}
export default new loginService


