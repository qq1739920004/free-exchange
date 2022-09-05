<template>
  <div>
    <nav class="header"><span :class="['navItem',isActive==='推荐'?'itemActive':'']"  @click="recommend">推荐</span><span :class="['navItem',isActive==='最新'?'itemActive':'']" @click="newest">最新</span></nav>
  </div>
</template>

<script setup lang="ts">
import {home} from '@/store/home/home';
import {ref} from 'vue';
import {storeToRefs} from 'pinia';
 const homeStore=home()
const {pageInfo,limit}=storeToRefs(homeStore)
const isActive=ref<string>('推荐')

 //推荐
  function recommend(){
      isActive.value='推荐'
      const category=pageInfo.value.category
      homeStore.$reset()
      pageInfo.value.method='rand'
      pageInfo.value.category=category
      homeStore.getsMoment()
  }
  //最新
  function newest(){
      isActive.value='最新'
      const category=pageInfo.value.category
      homeStore.$reset()
      pageInfo.value.method='newest'
      pageInfo.value.category=category
      homeStore.getsMoment()
  }
</script>

<style scoped lang='less'>
.header{
    height: 40px;
    display: flex;
    align-items:center;
    border-bottom: 1px solid rgb(233, 233, 233);
    justify-content:start;
    font-size: 15px;
    span{
      margin: 18px;
    }
  }
 .navItem{
      color: #71777c;
      border-radius: 10px;
      font-size: 14px;
      cursor: pointer;
      &:hover{
        color: #007fff;
      }
  }
  .itemActive{
    color: #007fff;
  }
</style>
