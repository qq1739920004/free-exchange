<template>
  <div class="nav">
      <div class="navbox">
        <span :class="['item','animate__animated',labelIndex===index?'itemActive':'noActive']" v-for="(item,index) in labels" :key="item.name" @click="labelAcitive(index,item.name)">{{item.name}}</span>
      </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {label} from '@/store/label/label';
import {mainLabelType} from '@/store/label/types';
import {home} from '@/store/home/home';
import {pageType} from '@/service/home/type';
import 'animate.css'
import {getmoments} from '@/store/home/types';
import { storeToRefs } from 'pinia';
//1.请求标签
 const labelStore=label()
  const labels=ref<mainLabelType[]>()
  const labelIndex=ref(0)
  labelStore.lookMainLabel().then((res)=>{
    labels.value=res

  })

//2.请求动态的代码
  const homeStore=home()
  const { pageInfo }=storeToRefs(homeStore)
  function getsMoment(category:string | number=0){
    const method=pageInfo.value.method
    homeStore.$reset()
    pageInfo.value.method=method
      pageInfo.value.category=category
      homeStore.getsMoment()
  }
  //第一次调用请求推荐的动态
getsMoment()


  //点击主标签
  function labelAcitive(index:number,name:string){
    const method=pageInfo.value.method
    homeStore.$reset()
    pageInfo.value.method=method
    labelIndex.value=index
    if(index){
      getsMoment(name)
    }
    else{
      getsMoment()
    }
  }
</script>

<style scoped lang="less">
.nav{
  border-top: 1px solid #f5f5f5;
  border-bottom: 12px solid #f5f5f5;
    height: 40px;
    width: 100%;
    background-color: white;
    display: flex;
    justify-content: center;
    .navbox{
      width: 100%;
      max-width: 1300px;
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
      animation: jello .8s;

      }
    .itemActive{
       color: #007fff;
    }
  }
</style>
