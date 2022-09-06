<template>
<div class="moment" >
  <moments-nav></moments-nav>
  <moment-list></moment-list>
</div>

</template>

<script setup lang="ts">
import {ref,defineProps,defineEmits,onUpdated, onMounted,nextTick} from 'vue';
import {getmoments} from '@/store/home/types';
import {storeToRefs} from 'pinia';
import {home} from '@/store/home/home';
import {timePurify} from '@/utils/timePurify';
import { ElMessage } from 'element-plus'
import {moment} from '@/store/moment/moment';
import { useRouter } from 'vue-router';
import {userRights} from '@/utils/islogin';
import {pageType} from '@/service/home/type';
import momentsNav from './momentsNav.vue';
import momentList from './momentList.vue';


</script>

<style scoped lang="less">
.moment{
  display: flex;
  flex-direction: column;
}
</style>
