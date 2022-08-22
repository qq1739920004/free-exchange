<template>
  <div class="header">
    <div class="user-box">
      <header-left v-if="!!token" :userInfo="userInfo"></header-left>
      <el-button v-else type="primary" class="loginbut">登录</el-button>
    </div>
    <div class="logo-box">
      <img class="logo" src="@/assets/img/logo.svg" alt="" />
      <h2 class="title">free社区</h2>
    </div>
    <div class="search">
      <headerRight></headerRight>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import { storeToRefs } from 'pinia'
import { login } from '@/store/login/login'
import headerLeft from './header-left.vue';
import headerRight from './header-right.vue';

const loginStore = login()
const { userInfo } = storeToRefs(loginStore)
const token=localStorage.getItem('token')
</script>

<style scoped lang="less">
@media (max-width:920px) {
  .header{
    width: 920px;
  }
}
.loginbut{
  width: 150px;
  height: 50px;
  font-size: 16px;
  border-radius: 12px;
}
.header {
  display: flex;
  align-items: center;
  font-family: 'yy';
  height: 80px;
  position: relative;
  border-bottom: 1px solid rgb(241, 241, 241);
  background-color: rgb(255, 255, 255);
}
.logo-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.user-box{
  position: absolute;
  left: 12%;
}
.search{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 60%;
}
.logo {
  width: 50px;
  margin-right: 10px;
  animation: logoR 60s linear infinite;
}


@keyframes logoR {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
