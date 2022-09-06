import {krlrequest} from '../index';
import {userInfoChangeType} from '@/service/user/types';
enum userPath{
  usersInfoChange='/users/change/introduce',//修改用户信息（名字，个人简介）
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


}
export default new userService
