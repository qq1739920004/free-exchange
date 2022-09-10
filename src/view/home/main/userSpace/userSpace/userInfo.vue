<template>
<div class="user">
  <div :class="route.query.id==id2 ? 'user-info' :'user-center'" v-if="userInfo?.avatar_url">
      <div class='userBox'>
        <div class="img-box" @mouseenter="isShowText=true" @click="changeImage" @mouseleave="isShowText=false">
        <img :class="['path',{'path2':isShowText}]"   :src="userInfo?.avatar_url" alt=""><div v-show="isShowText"  class="pathText">更换头像</div>
        </div>
        <div class="usercontent">
          <h1 class="name">{{userInfo?.nameTure}}</h1>
          <p class="introduce"><el-icon class="icon"><Postcard /></el-icon>{{userInfo.introduce ? userInfo.introduce : '对方太懒了，并没有写简介'}}</p>
        </div>
      </div>
    <div class="but" v-if="route.query.id==id2">
      <el-button type="primary" size="large" plain @click="changeUserInfo">修改个人信息</el-button>
      <span @click="changePassword">修改密码</span>
    </div>
  </div>
  <div class="iconurl">
     <el-tooltip
        class="box-item"
        effect="dark"
        content="https://github.com/qq1739920004/free-exchange"
        placement="bottom-start"
      >
        <img @click="gourl('https://github.com/qq1739920004/free-exchange')" src="~@/assets/img/github.png" alt="https://github.com/qq1739920004/free-exchange">
      </el-tooltip>
    <el-tooltip
        class="box-item"
        effect="dark"
        content="1739920004"
        placement="bottom-start"
      >
        <img src="~@/assets/img/QQ.png" alt="">
      </el-tooltip>
     <el-tooltip
        class="box-item"
        effect="dark"
        content="1739920004@qq.com"
        placement="bottom-start"
      >
        <img src="~@/assets/img/邮箱.png" alt="">
      </el-tooltip>

    </div>

</div>
     <ldialog v-if="isReset" @commit-from="commitFrom"  :formLabelAlign="formLabelAlign"  v-model:dialog-visible="dialogVisible"   v-model:form-data="formData" h="修改用户信息"></ldialog>
     <ldialog v-if="isResetAvartar" :isAvartar=true @commit-from="commitFromAvartar"  :formLabelAlign="formLabelAlign3"  v-model:dialog-visible="dialogVisible3"   v-model:form-data="formData3" h="更换头像"></ldialog>

     <ldialog v-if="isResetPssword"  :rules=rules @commit-from="commitFromPassword"  :formLabelAlign="formLabelAlign2"  v-model:dialog-visible="dialogVisible2"   v-model:form-data="formData2" h="修改用户信息"></ldialog>
</template>

<script setup lang="ts">
import {ref,defineProps} from 'vue';
import {storeToRefs} from 'pinia';
import {user} from '@/store/user/user';
import type {userInfoType} from '@/store/login/types';
import {useRouter,useRoute} from 'vue-router';
import ldialog from '@/components/ldialog/ldialog.vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import {dialogVisible,formLabelAlign,formData} from './config';
import {dialogVisible2,formLabelAlign2,formData2,rules} from './passwordConfig';
import {dialogVisible3,formLabelAlign3,formData3} from './avatarConfig';

import type { FormInstance, FormRules } from 'element-plus'

const props=defineProps(['id'])
const route=useRoute()

const id2=JSON.parse(localStorage.getItem('user')).id
// 1.获取基本信息
const userStore=user()

const {userInfo}=storeToRefs(userStore)
async function lcreate(){
  await userStore.getUserInfo(route.query.id)
  formData.value.nameTrue=userInfo.value.nameTure
  formData.value.introduce=userInfo.value.introduce

}
lcreate()

//2.点击跳转到外链
const router=useRouter()
function gourl(url:string){
     window.open(url, '_blank');
}
// 3.修改个人信息
const isReset=ref(false)//是否显示修改表单
function changeUserInfo(){
  dialogVisible.value=true
  isReset.value=true
}

async function commitFrom(){
  await userStore.usersInfoChange(formData.value)
  lcreate()
   ElMessage({
    message: '修改成功',
    type: 'success',
  })
}
// 4.修改密码
const isResetPssword=ref(false)//是否显示修改表单

async function changePassword(){
  dialogVisible2.value=true
  isResetPssword.value=true
}

async function commitFromPassword(){
  if(formData2.value.newPassword.length<5 || formData2.value.newPassword.length>15){
      ElMessage({
    message: '密码长度不正确!',
    type: 'error',
    })
    return
  }
  if(formData2.value.newPassword !== formData2.value.againPassword){
    ElMessage({
    message: '再次输入的密码不相同!',
    type: 'error',
    })
    return
  }
  else{
    const res=await userStore.usersPasswordChange(formData2.value)
    console.log(res);
    if(res && res!=='原密码错误'){
       ElMessage({
    message: '修改成功,请重新登录!',
    type: 'success',
    })
  //清空密码框value
    for(var key in formData2.value){
      formData2.value[key]=''
    }
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    router.push('/login')
    }
    else{
      ElMessage({
    message: '原密码输入错误!',
    type: 'error',
    })
    }
  }

}
  // 5.触摸显示修改头像

  const isShowText=ref(false)
  const isResetAvartar=ref(false)//是否显示修改表单
function changeImage(){
  dialogVisible3.value=true
  isResetAvartar.value=true
}

async function commitFromAvartar(){
  lcreate()
   ElMessage({
    message: '修改成功',
    type: 'success',
  })
}

</script>

<style scoped lang='less'>

.iconurl{
  display: flex;
  justify-content: start;
  padding: 15px 20px;
  img{
    width: 25px;
    height: 25px;
    margin-right: 20px;
    cursor: pointer;
  }
}
.user-center{
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
}
.user-info{
  padding: 16px 20px;
  margin-top: 20px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgb(226, 227, 226);
  width: 100%;
  box-sizing: border-box;

}
 .path{
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
.user{
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 1000px;
  background-color: white;
}
.userBox{
  display: flex;

}
.but{
  display: flex;
  justify-content: center;
  flex-direction: column;
  span{
    margin: 4px 0;
    cursor: pointer;
    font-size: 14px;
    text-decoration: underline;
    color: rgb(183, 183, 188);
    &:hover{
      color: #2e8eef;
    }
  }
}
.icon{
  vertical-align:-3px;
  margin-right: 10px;
  font-size: 16px;

}
.introduce{
  text-align: start;
  font-size: 14px;
}
.github{
  width: 100%;
  height: 50px;
}
.name{
  text-align: start;
}
.path2{
  cursor: pointer;

 opacity: 0.4;
}
.pathText{
  width: 100px;
  position: absolute;
  left: 50%;
  top: 50% - 7px;
  transform: translate(-50%);
  font-size: 15px;
  cursor: pointer;
  color: #5e5f5f;
}
.img-box{
  position: relative;
  margin-right: 20px;

}
</style>
