<template>
  <div class="header">
    <div class="user-box" v-if="isHome">
      <header-left v-if="!!token"   :userInfo="userInfo"></header-left>
      <el-button type="primary"  v-else @click="goLogin" class="loginbut">登录</el-button>
    </div>
    <div @click="goHome" :class="['logo-box',isHome?'':'logo-box2']">
      <img class="logo" src="@/assets/img/logo.svg" alt="" />
      <h2 class="title">free社区</h2>
    </div>
    <h6 class="text" v-if="!isHome">{{textValue}}</h6>
    <div class="search" v-if="isHome">
      <headerRight></headerRight>
    </div>
    <div class="rightbut"  v-if="!isHome">
      <el-button type="primary" class="but" @click="publish">发表文章</el-button>
      <el-button type="danger" @click="deleteAll" class="but">清空编辑</el-button>
      <!-- 发表文章的逻辑 -->
    </div>
      <ldialog v-if="isReset" @commit-from="commitFrom" :formLabelAlign="formLabelAlign" :isdynamicTags="true"  v-model:dynamic-tags="dynamicTags" v-model:dialog-visible="dialogVisible"   v-model:form-data="formData" h="发表文章"></ldialog>

  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import { storeToRefs } from 'pinia'
import { login } from '@/store/login/login'
import headerLeft from './header-left.vue';
import headerRight from './header-right.vue';
import { useRouter } from 'vue-router'
import {createM} from '@/store/createM/createM';
import {dialogVisible,formLabelAlign,formData,dynamicTags} from '@/view/home/components/config'
import { ElMessage, ElMessageBox } from 'element-plus'
import ldialog from '@/components/ldialog/ldialog.vue';



const loginStore = login()
const { userInfo } = storeToRefs(loginStore)
const token=localStorage.getItem('token')
const router=useRouter()
function goLogin(){
  router.push('/login')
}

const createMStore=createM()
const {createMInfo}=storeToRefs(createMStore)

let {isHome,textValue}=storeToRefs(createMStore)
//清空编辑器触发
 const deleteAll = () => {
  ElMessageBox.confirm(
    '你确定是否删除,一旦删除不可恢复',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: true,
    }
  )
    .then(() => {
      createMStore.deleteTemp(createMInfo.value.id).then(()=>{
        localStorage.removeItem('tempId')
        router.push('/free')
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
      })

    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消成功',
      })
    })
}
//控制销毁表单属性value的变量
const isReset=ref<boolean>(false)
//点击发表文章触发
async function publish(){
  isReset.value=true
 await createMStore.getTemp()
  if(createMInfo.value.title.length<8){
    ElMessage({
        type: 'error',
        message: '标题字数需要大于7个字',
      })
  }
  else if(createMInfo.value.content.length<20){
    ElMessage({
        type: 'error',
        message: '你想要发布的文章字数过少',
      })
  }
  else{
    dialogVisible.value = true
  }


}

//伪动态转正
async function commitFrom(){
    await createMStore.tempBecome(createMInfo.value.id,formData.value,Object.values(dynamicTags.value))
    localStorage.removeItem('tempId')
    router.push('/free')
    isReset.value=false
    formData.value={}
    dynamicTags.value=[]
}
//回到首页
function goHome(){
  router.push('/free')
}
</script>

<style scoped lang="less">
@bodersize:12px;

.loginbut{
  width: 150px;
  height: 50px;
  font-size: 15px;
  border-radius: @bodersize;
  font-weight: 600;
  color: white;
  text-align: center;
  position:relative;
  overflow: hidden;
  box-sizing:border-box;
  background-color:white;
  border: none;
  outline: none;
  z-index: 1;

  &::before{
    content: '';
    width: 200%;
    height: 200%;
    background-color: rgb(151, 202, 254);
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: -2;
    transform-origin: 0 0;
    animation: butrotate 2s linear infinite;
  }
  &::after{
    content: '';
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    background-color:rgb(64, 158, 255);
    position: absolute;
    border-radius: @bodersize;
    z-index: -1;
    left: 3px;
    top: 3px;
    z-index: -1px;
  }

  &:hover{
    &::after{
      background-color:rgb(113, 181, 249);
    }
    &::before{
      animation-play-state: paused
    }

  }
}
.rightbut{
  height: 100%;
  position: absolute;
  right: 12%;
  display:flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  .but{
    margin: 0;
  }
}
.text{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
  color: #bdbcbc;
}
.header{
  text-align: center;

}
@keyframes butrotate{
  from{
    transform:rotate(0deg);
  }
  to{
    transform:rotate(360deg);
  }
}
@media (max-width:920px) {
  .header{
    width: 920px;
  }
}


.header {
  display: flex;
  align-items: center;
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
  cursor: pointer;
}
.logo-box2{
  position: relative;
  left: 20px;
  flex: 0.2;
}

.user-box{
  position: absolute;
  left: 12%;
}
.rightuser{
  position: absolute;
  right: 10%;
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
.title{
  font-family: 'yy';
}
 @font-face {
  font-family: 'yy';
  src: url('~@/assets/圆体.ttf');
}
</style>
