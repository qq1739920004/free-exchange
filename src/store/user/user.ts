import { defineStore } from 'pinia'
import userService from '@/service/user/index'
import {userInfoChangeType,userInfoPasswordType} from '@/service/user/types';
import type { pageType } from '@/service/home/type'
import type {userInfoType} from '@/store/user/types';

let userInfo:userInfoType
let pageInfo:pageType
let userCollect:any[]
export const user = defineStore('user',{
  state: () => {
    return {
      method:'用户收藏',
      userCollect,
      pageInfo:{
        start:0,
        end:5,
      },
      uid:1,
      limit:1,
      userInfo
    }
  },
  actions: {
    //修改用户信息（名字，个人简介）
    async usersInfoChange(userInfo:userInfoChangeType){
      const result = await userService.usersInfoChange(userInfo)
      return result
    },
      //修改用户密码
    async usersPasswordChange(userPasswordInfo:userInfoPasswordType){
      const result = await userService.usersPasswordChange(userPasswordInfo)
      return result
    },
     //获取用户收藏的文章
    async getUserCollect(){

      const result = await userService.getUserCollect(this.pageInfo,true,this.uid)
      this.userCollect=result
      return result
    },
     //获取用户创建的文章
     async getUserPublish(){
      const result = await userService.getUserPublish(this.pageInfo,true,this.uid)
      this.userCollect=result
      return result
    },

    //下拉更新
    async addUserCollect(){
      let result
      if(this.method==='用户收藏'){
        result= await userService.getUserCollect(this.pageInfo,false,this.uid)
      }
      else{
        result = await userService.getUserPublish(this.pageInfo,false,this.uid)
      }
      if(result.length<5 || result.length==0){
        this.limit=0
      }
      this.userCollect=this.userCollect?.concat(result)
    },
    //获取用户信息
    async getUserInfo(id:number | string){
      const result = await userService.getUserInfo(id)
          this.userInfo=result
          return result
    },
    //删除用户文章
    async deleteMoment(id:number,index:number){
      const result = await userService.deleteMoment(id)
      this.userCollect.splice(index,1)
      return result
    }
  }
}
)
