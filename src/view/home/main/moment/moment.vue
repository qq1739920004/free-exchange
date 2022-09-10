<template>
  <div class="moment"  v-title="momentDetail.title" v-if="momentDetail.user">
    <moment-header :momentDetail=momentDetail></moment-header>
    <contentl class="contentl" @toComment='toComment'></contentl>
    <comment :momentId='momentId' ref="commentR"></comment>
    <div class="goTop" @click="goTop"><el-icon><Top /></el-icon></div>
  </div>

</template>

<script setup lang="ts">
import { onMounted, ref,getCurrentInstance  } from 'vue';
import {storeToRefs} from 'pinia';
import {moment} from '@/store/moment/moment';
import {getmoments} from '@/store/home/types';
import {useRoute} from 'vue-router';
import contentl from './content.vue';
import momentHeader from './momentHeader.vue';
import comment from './comment.vue';

// 1.获取动态详情，赋值
const momentDetail=ref<getmoments>('')
const route=useRoute()
const {momentId}=route.params
const momentStore=moment()

//自定义一个页面加载就请求数据的async方法
async function service() {
  const res=await momentStore.getMomentDetail(momentId)
  momentDetail.value=res
}
service()
// 2.跳转到评论的dom元素位置
const commentR=ref(null)
const { proxy } = getCurrentInstance();
function toComment(){
  proxy.$refs['commentR'].commentTarget.scrollIntoView();

}

//3.回到顶部的逻辑
function goTop(){
  window.scrollTo({
    top:0,
    behavior:'smooth'
  })
}

</script>

<style scoped lang='less'>
  .goTop{
    position: fixed;
    bottom: 50px;
    right: 50px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    font-size: 30px;
    cursor: pointer;
    &:hover{
      background-color: rgb(197, 196, 196);
    }
  }
  .moment{
  position: relative;
  max-width:1000px;
  width: 100%;
  margin: 20px  auto 0;
}

</style>

