import { defineStore } from 'pinia'
import userService from '@/service/user/index'
import {userInfoChangeType} from '@/service/user/types';

export const user = defineStore('user',{
  state: () => {
    return {
    }
  },
  actions: {

    //修改用户信息（名字，个人简介）
    async usersInfoChange(userInfo:userInfoChangeType){
      const result = await userService.usersInfoChange(userInfo)
      return result
      }

  }
}
)
