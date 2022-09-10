<template>
  <div class="search-taget" v-title="'搜索:'+route.query.searchValue">
    <nav-top :isSearch='true'  class="content"></nav-top>
    <moment-nav :isSearch='true' class="moment-nav"></moment-nav>
    <moment-list class="list"></moment-list>
  </div>
</template>

<script setup lang="ts">
import momentItem from '@/view/home/main/content/components/mainContent/momentItem.vue';
import momentNav from '@/view/home/main/content/components/mainContent/momentsNav.vue';
import momentList from '@/view/home/main/content/components/mainContent/momentList.vue';
import {useRoute} from 'vue-router';
import navTop from '@/view/home/main/content/components/navTop.vue';

const route=useRoute()

</script>
<style scoped>
@media (max-width:920px) {
  .content{
    width: 920px;
  }

}
.content{
  justify-content: center;
  align-items: center;
}
.search-taget{
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: rgb(241, 240, 240);
}
.moment-nav{
  background-color: #ffffff;
}
::v-deep.moment-nav>.header{
  display: flex;
  justify-content: center;
  width: 100%;
  min-width: 920px;
}
.list{
  width: 800px;
  min-height:calc(100vh - 50px) ;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgb(255, 255, 255);
}
</style>
