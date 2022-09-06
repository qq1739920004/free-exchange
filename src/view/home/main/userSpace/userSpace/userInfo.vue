<template>
<div class="user">
  <div class="user-info" v-if="userInfo?.path">
      <div class='userBox'>
        <img class="path" :src="userInfo.path" alt="">
        <div class="usercontent">
          <h1 class="name">{{userInfo.nameTure}}</h1>
          <p class="introduce"><el-icon class="icon"><Postcard /></el-icon>{{userInfo.introduce}}</p>
        </div>
      </div>
    <div class="but"><el-button type="primary" size="large" plain @click="changeUserInfo">修改个人信息</el-button></div>
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

</template>

<script setup lang="ts">
import {ref} from 'vue';
import {storeToRefs} from 'pinia';
import {login} from '@/store/login/login';
import type {userInfoType} from '@/store/login/types';
import {useRouter} from 'vue-router';
import ldialog from '@/components/ldialog/ldialog.vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import {user} from '@/store/user/user';
import {dialogVisible,formLabelAlign,formData} from './config';

// 1.获取基本信息
const loginStore=login()
const {userInfo}=storeToRefs(loginStore)
async function lcreate(){
  await loginStore.isLogin()
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
const userStore=user()
const isReset=ref(false)//是否显示修改表单
function changeUserInfo(){
  dialogVisible.value=true
  isReset.value=true
}

async function commitFrom(){
  await userStore.usersInfoChange(formData.value)
  lcreate()
  console.log(formData.value);
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
.user-info{
  padding: 16px 20px;
  margin-top: 20px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgb(226, 227, 226);
  width: 100%;
  box-sizing: border-box;
  .path{
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-right: 20px;
  }
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
  align-items: center;
}
.icon{
  vertical-align:-3px;
  margin-right: 10px;
  font-size: 16px;

}
.introduce{
  font-size: 14px;
}
.github{
  width: 100%;
  height: 50px;
}
.name{
  text-align: start;
}
</style>
