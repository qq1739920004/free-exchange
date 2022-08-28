<template>
  <div class="nav">
      <div class="navbox">
        <span :class="['item',labelIndex===index?'itemActive':'noActive']" v-for="(item,index) in labels" :key="item.name" @click="labelAcitive(index)">{{item.name}}</span>
      </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {label} from '@/store/label/label';
import {mainLabelType} from '@/store/label/types';
  const labelStore=label()
  const labels=ref<mainLabelType[]>()
  const labelIndex=ref(0)
  labelStore.lookMainLabel().then((res)=>{
    labels.value=res

  })
  //点击主标签
  function labelAcitive(index:number){
    labelIndex.value=index
  }
</script>

<style scoped lang="less">
.nav{
  border-top: 1px solid #f5f5f5;
    height: 40px;
    width: 100%;
    background-color: white;
    display: flex;
    justify-content: center;
    .navbox{
      width: 100%;
      max-width: 1200px;
      display: flex;
      justify-content: start;
      align-items: center;
    }
    .item{
      margin: 0 10px;
      padding: 5px 8px;
      color: #71777c;
      border-radius: 10px;
      font-size: 14px;
      cursor: pointer;

    }
    .noActive:hover{
        color: #007fff;
      }
    .itemActive{
       color: #007fff;
    }
  }
</style>
