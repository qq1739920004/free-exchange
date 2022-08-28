<template>
<div class="moment">
  <div v-for="item in momentsInfo" :key="item.id" class="item" >
    <div class="moment-header">
      <span>{{item.user.name}}</span>
      <span>{{timePurify(item.createAt)}}</span>
      <span>{{item.user.name}}</span>
      <span>{{item.user.name}}</span>
      </div>
  </div>
</div>

</template>

<script setup lang="ts">
import {ref,defineProps,defineEmits,withDefaults, Ref} from 'vue';
import {getmoments} from '@/store/home/types';
import {storeToRefs} from 'pinia';
import {home} from '@/store/home/home';
import {timePurify} from '@/utils/timePurify';
//获取动态数据
const homeStore=home()
const {momentsInfo}=storeToRefs(homeStore)
console.log(momentsInfo.value);


</script>

<style scoped lang="less">
.moment{
  display: flex;
  flex-direction: column;
}
.item{
  border-bottom: 1px solid black;
  height: 170px;
}
</style>
