<template>
  <div class="login">
<h1>我是登录页面</h1>
  </div>
</template>

<script setup lang="ts">
import loginService from '../../service/login/index';
loginService.login()

</script>

<style scoped>
</style>
