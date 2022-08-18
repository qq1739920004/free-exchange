import {krlrequest} from '../index';


class loginService{
  login(){
    krlrequest.request({
      url:'/login',
      method:'post',
      data:{
          "name":"kl",
          "password":"123456"
      },
      isLoding:true,
      interceptor:{
        responseInterceptorLaunch:(res:any)=>{
         return res
        }
      }
    }).then(res=>{
      console.log(res)
    }
    )
  }
}
export default new loginService


