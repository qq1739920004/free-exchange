<template>
  <div class="home">
    <lheader></lheader>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import lheader from './components/header.vue' //首页头
import {home} from '@/store/home/home';
import {login} from '@/store/login/login';
import type { pageType } from '@/service/home/type'
import { reactive } from 'vue';
import {useRouter} from 'vue-router';

const homeStore=home()
const loginStore=login()
const router=useRouter()
const pageInfo=reactive<pageType>({
  start:0,
  end:10
})
lcreate()
async function lcreate() {
  homeStore.getsMoment(pageInfo)
  const res=await loginStore.isLogin()
  if(!res){
    router.push('/login')
  }
}
</script>

<style scoped>
.home {
  background-color: rgb(244, 245, 245);
  width: 100%;
  height: 100%;
}
</style>
