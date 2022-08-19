<template>
  <div class="login">
    <div class="login-box">
      <h5 class="title">free交流社区</h5>
      <el-tabs v-model="activeName" stretch class="demo-tabs">
        <el-tab-pane label="登录" name="login">
          <lform></lform>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">Config</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { optionTag } from './type'

import lform from './components/lform.vue';

let activeName = ref<optionTag>('login')


</script>

<style scoped lang="less">
@font-face {
  font-family: 'yy';
  src: url('~@/assets/圆体.ttf');
}
.login {
  font-size: 20px;
  width: 100%;
  height: 100vh;
  background: url('~@/assets/img/login-bg.svg');
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    width: 500px;
    border: 1px solid #e7e7e7;
    border-radius: 10px;

  }
  .demo-tabs{
    padding-bottom: 50px;
    box-sizing: border-box;
  }
  .title {
    font-family: 'yy';
    margin: 25px 0;
    font-size: 30px;
  }
}
</style>
