<template>
  <div class="home">
    <el-button type="primary">Primary</el-button>
    <h1>我是首页</h1>

    <el-icon><iphone /></el-icon>
    <Edit style="width: 1em; height: 1em; margin-right: 8px" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
if (!localStorage.getItem('token')) {
  router.push('/login')
}
</script>

<style scoped>
.home{
  background-color: rgb(244, 245, 245);
}
</style>
