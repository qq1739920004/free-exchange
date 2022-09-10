<template>
  <div class="user-moment-info">
    <el-tabs v-model="method"   type="border-card" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="用户收藏" name="用户收藏">
      <user-list :id='route.query.id' navtext='用户收藏'></user-list>
    </el-tab-pane>
    <el-tab-pane  label="用户文章" name="用户文章">
      <user-list :id='route.query.id' navtext='用户文章'></user-list>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script setup lang="ts">
import {ref,defineProps} from 'vue';
import {storeToRefs} from 'pinia';
import {user} from '@/store/user/user';
import userList from './userList';
import {useRoute} from 'vue-router';
const route=useRoute()
const props=defineProps(['id'])
// 1.获取用户收藏信息
const userStore=user()
const {method,uid}=storeToRefs(userStore)
lcreate()
async function lcreate(){
  const res=await userStore.getUserCollect()
}


//2.配置文件
async function handleClick(){
    const oldMethod=method.value
    userStore.$reset()
    uid.value=route.query.id
    method.value=oldMethod

   await userStore.getUserInfo(route.query.id)
  if(method.value==='用户收藏'){
    await userStore.getUserCollect()
  }
  else if(method.value==='用户文章'){
    await userStore.getUserPublish()
  }
}
</script>

<style scoped>
.user-moment-info{
  margin: 0 auto;
  padding: 10px 0px;
  width: 1000px;
  box-sizing: border-box;
  background-color: white;
}
::v-deep .is-el-tabs__nav-scroll{
  padding: 0 20px;
}
</style>
