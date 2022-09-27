import {krlrequest} from '../index';
import {userInfoChangeType,userInfoPasswordType} from '@/service/user/types';
import type { pageType } from '@/service/home/type'
import type {userInfoType} from '@/store/user/types';



enum userPath{
  usersInfoChange='/users/change/introduce',//修改用户信息（名字，个人简介）
  usersPasswordChange='/users/change/password',//修改用户密码
  getUserCollect='/users/collection',//获取用户收藏
  getUserPublish='/users/publish',//获取用户创建的文章
  getUserInfo='/users/userInfo',//获取用户信息
  deleteMoment='/moment/'//删除用户文章
}
class userService{
//修改用户信息（名字，个人简介）
usersInfoChange(userInfo:userInfoChangeType){
    return krlrequest.request({
      url:userPath.usersInfoChange,
      method:'post',
      data:userInfo
    })
  }
//修改用户密码
usersPasswordChange(userPasswordInfo:userInfoPasswordType){
  return krlrequest.request({
    url:userPath.usersPasswordChange,
    method:'post',
    data:userPasswordInfo
  })
}
//获取用户收藏
getUserCollect(page:pageType,isLoding=false,id:number | string){
  return krlrequest.request<any>({
    url:userPath.getUserCollect,
    method:'post',
    params:page,
    data:{
      id:id
    },
    isLoding:isLoding
  })
}
//获取用户创建的文章
getUserPublish(page:pageType,isLoding=false,id:number | string){
  return krlrequest.request<any>({
    url:userPath.getUserPublish,
    method:'post',
    params:page,
    data:{
      id:id
    },
    isLoding:isLoding
  })
}
//获取用户信息
getUserInfo(id:number | string){
  return krlrequest.request<userInfoType>({
    url:userPath.getUserInfo,
    method:'post',
    data:{
      id:id
    }
  })
}
//删除用户文章
deleteMoment(id:number){
  return krlrequest.request({
    url:userPath.deleteMoment+id,
    method:'delete'
  })
}


}
export default new userService
