<template>
  <div class="search">
    <el-input
        v-model="value"
        :class="['w-50','m-2','inp',!isDisabled ? 'focusW' : 'blurW']"
        :placeholder="placeholder"
        clearable
        @focus="focusF"
        @blur="blurF"
      />
      <el-button @click="searchStart" type="primary" :disabled="isDisabled" class="searchbut"  :icon="Search" />
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import {ref} from 'vue';
import {home} from '@/store/home/home';
import {storeToRefs} from 'pinia';

// 1.输入框配置
let value=ref<string>('')
let isDisabled=ref<boolean>(true)
let placeholder=ref<string>('搜你所想吧~')
function focusF(){
    isDisabled.value=false

  placeholder.value='搜索你想搜索的文章标题~'
}
function blurF(){
  if(!value.value){
    isDisabled.value=true
  }

  placeholder.value='搜你所想吧~'
}
//2.点击搜索
const homeStore=home()
const {pageInfo,momentsInfo}=storeToRefs(homeStore)
async function searchStart(){
  homeStore.$reset()
  pageInfo.value.search=value.value
  await homeStore.getsMoment()
  console.log(momentsInfo.value);
}
</script>

<style scoped>
.search{
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.focusW{
  width: 350px;
}
.blurW{
  width: 200px;
}
.inp{
  transition: all,.5s;
}
.searchbut{
  position: absolute;
  right: 2px;
  width: 40px;
  height: 28px;
}

</style>
