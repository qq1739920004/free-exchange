<template>
  <div>
<h1>我是首页</h1>
<button @click="goLogin">跳转到登录</button>
    <el-button type="primary">Primary</el-button>
    <el-icon><iphone /></el-icon>
    <Edit style="width: 1em; height: 1em; margin-right: 8px" />
  </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'
const router=useRouter()
function goLogin(){
router.push('/login')
}
</script>

<style scoped>
</style>
