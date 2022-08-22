<template>
  <div class="hleft">
    <el-dropdown>
      <span class="el-dropdown-link">
        <span class="name" v-if="props.userInfo">{{ props.userInfo.name }}</span>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item><span class="userInfo">个人中心</span></el-dropdown-item>
          <el-dropdown-item
            ><span class="outLogin" @click="outLogin">退出登录</span></el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <img class="avatar" v-if="props.userInfo" :src="props.userInfo.path" alt="" />
    <el-button type="primary" class="create" size="large" auto-insert-space @click="goCreate">创作文章</el-button>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from 'vue';
import {userInfoType} from '@/store/login/types';
import { useRouter } from 'vue-router'

const props=defineProps<{
  userInfo:userInfoType
}>()
const router = useRouter()

function outLogin(){
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}
function goCreate(){
  router.push('/free/create')
}
</script>

<style scoped lang="less">
@urlColor:rgb(93, 156, 218);
.name{
  vertical-align: 2px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 8px;
  margin-right: 50px;
}
.create{
  width: 120px;
}
.hleft {
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-dropdown-link {
  color: @urlColor;
  font-size: 16px;

}
.userInfo{
  color: @urlColor;
}
.outLogin{
  color:@urlColor;
  border-bottom: 1px solid @urlColor;
}
</style>
