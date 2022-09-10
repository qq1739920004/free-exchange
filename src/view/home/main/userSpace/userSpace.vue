<template>
  <div class="space"  v-title="userInfo?.nameTure +' 的个人中心'">
    <user-infos :id=id></user-infos>
    <user-moment-info :id=id></user-moment-info>
  </div>
</template>

<script setup lang="ts">
import userInfos from '@/view/home/main/userSpace/userSpace/userInfo.vue';
import userMomentInfo from '@/view/home/main/userSpace/userSpace/userMomentInfo.vue';
import {ref} from 'vue';
import {storeToRefs} from 'pinia';
import {user} from '@/store/user/user';
import {useRoute,onBeforeRouteUpdate } from 'vue-router';
const userStore=user()
const route=useRoute()
const {userInfo,uid} =storeToRefs(userStore)

const id=ref('')
id.value=route.query.id
uid.value=id.value

userStore.getUserInfo(id.value)
 onBeforeRouteUpdate(async (to, from) => {
      //仅当 id 更改时才获取用户，例如仅 query 或 hash 值已更改
      if (to.query.id !== from.query.id) {
        userStore.$reset()
        uid.value=to.query.id

        userStore.getUserInfo(to.query.id)
        await userStore.getUserCollect()
        console.log('我改变啦');
      }
    })
</script>

<style scoped>
.space{
  position: relative;
  left: 50%;
  transform: translateX(-50%);

}
</style>
