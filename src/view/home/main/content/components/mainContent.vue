<template>
  <div class="mainContent">
    <moment-item  class="moment-box"></moment-item>
    <div class="ranking-box">
      <div class="ranking"></div>
      <div class="ranking"></div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';

import momentItem from './mainContent/momentItem.vue';




</script>

<style scoped lang="less">
.mainContent{
  max-width: 1300px;
  width: 100%;
  background-color: white;
  display: flex;

}
.moment-box{
  flex: 1;
  height: 100%;
}
.ranking-box{

  flex: 0.6;
  height: 800px;
  background-color: blue;
  display: flex;
  flex-direction: column;
  .ranking{
    flex: 1;
  }
}
</style>
