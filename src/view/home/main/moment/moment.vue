<template>
  <div class="moment" v-if="momentDetail.user">
    <moment-header :momentDetail=momentDetail></moment-header>
    <contentl class="contentl"></contentl>
    <comment :momentId='momentId'></comment>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
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

</script>

<style scoped lang='less'>
  .moment{
  position: relative;
  max-width:1000px;
  width: 100%;
  margin: 20px  auto 0;
}

</style>
