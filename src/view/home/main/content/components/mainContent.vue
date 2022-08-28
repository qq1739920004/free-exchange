<template>
  <div class="mainContent">

  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {home} from '@/store/home/home';
import {pageType} from '@/service/home/type';
import {getmoments} from '@/store/home/types';
  const homeStore=home()
  const pageInfo=ref<pageType>({
    start:0,
    end:10
  })
  const result=ref<getmoments[]>()
  homeStore.getsMoment(pageInfo.value).then(res=>{
    result.value=res
    console.log(result.value);
  })

</script>

<style scoped lang="less">
.mainContent{
  max-width: 1200px;
  width: 100%;
  background-color: white;
  height: 800px;
}
</style>
