<template>
  <div class="hleft">
    <el-dropdown>
      <span class="el-dropdown-link">
        <b class="name" v-if="props.userInfo">{{
          props.userInfo.nameTure
        }}</b>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            ><span class="userInfo" @click="goSpace">个人中心</span></el-dropdown-item
          >
          <el-dropdown-item
            ><span class="outLogin" @click="outLogin"
              >退出登录</span
            ></el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <img
      @click="goSpace"
      class="avatar"
      v-if="props.userInfo"
      :src="props.userInfo.path"
      alt=""
    />
    <el-button
      type="primary"
      class='create'
      size="large"
      auto-insert-space
      @click="goCreate"
      >创作文章</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { userInfoType } from '@/store/login/types'
import { useRouter } from 'vue-router'
import {createM} from '@/store/createM/createM';
import {storeToRefs} from 'pinia';

const props = defineProps<{
  userInfo: userInfoType
}>()
const router = useRouter()
//退出登录
function outLogin() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}
//跳转到用户中心
function goSpace(){
  router.push({path:'/free/space',query:{id:props.userInfo.id}})

}
const createMStore=createM()
const {createMInfo}=storeToRefs(createMStore)
function goCreate() {
  createMStore.getTemp().then(()=>{
    localStorage.setItem('tempId',createMInfo.value.id+'')
    router.push('/free/create')
  }
  )
}
</script>

<style scoped lang="less">
.name {
  vertical-align: 2px;
  font-family: '黑体';
  font-weight: 500;
}
.avatar {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 8px;
  margin-right: 50px;
}
.create {
  width: 120px;
}
.hleft {
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-dropdown-link {
  color: rgb(93, 156, 218);
  font-size: 16px;
}
.userInfo {
  color: rgb(93, 156, 218);
}
.outLogin {
  color: rgb(93, 156, 218);
  border-bottom: 1px solid rgb(93, 156, 218);
}
</style>
