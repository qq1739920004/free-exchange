<template>
  <div class="login">
    <div class="login-box">
      <img class="logo" src="@/assets/img/logo.svg" />
      <h5 class="title animate__animated animate__tada">free交流社区</h5>
      <el-tabs v-model="activeName" stretch class="demo-tabs">
        <el-tab-pane label="登录" name="login">
          <template #label>
            <span
              ><el-icon :size="15">
                <Pointer />
              </el-icon>
              登录</span
            >
          </template>
          <lform butInfo="登录" @loginChange="loginChange"></lform>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <template #label>
          <span
              ><el-icon><Plus /></el-icon> 注册</span>
          </template>
          <lform butInfo="注册" @loginChange="loginChange"></lform>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { optionTag } from './type'
import { useRouter } from 'vue-router'
import 'animate.css'

import lform from './components/lform.vue'

let activeName = ref<optionTag>('login')
const router = useRouter()
function loginChange() {
  router.push('/free')
}
</script>

<style scoped lang="less">

::v-deep .el-tabs__item {
  font-size: 15px;
}
::v-deep .el-icon {
  vertical-align: -2px;
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
    position: relative;
  }
  .demo-tabs {
    box-sizing: border-box;
  }


  .logo {
    position: absolute;
    left: -24px;
    top: -24px;
    animation: logoR ease-in-out 4.5s 1.5s infinite;
  }
  @keyframes logoR {
    0% {
      transform: rotate(0deg);
    }
    60% {
      transform: rotate(2520deg);
    }
    100%{
      transform: rotate(2520deg);
    }
  }
}
 @font-face {
  font-family: 'yy';
  src: url('~@/assets/圆体.ttf');
}
.title {
    font-family: 'yy';
    margin: 25px 0;
    font-size: 30px;
    display: inline-block;
  }
</style>
