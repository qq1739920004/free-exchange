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

const loginStore=login()
const router=useRouter()

lcreate()
async function lcreate() {
  const res=await loginStore.isLogin()
}
</script>

<style scoped>
.home {
  background-color: rgb(244, 245, 245);
  width: 100%;
}
</style>
