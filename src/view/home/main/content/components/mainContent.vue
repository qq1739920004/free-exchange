<template>
  <div class="mainContent">
    <moment-item  class="moment-box"></moment-item>
    <div class="ranking-box">
      <div class="ranking rankingGive">
        <ranking-list :heardInfo=heardInfoGive rankingName='giveCount'></ranking-list>
      </div>
      <div class="ranking rankingCollection"></div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import rankingList from './mainContent/rankingList.vue';
import momentItem from './mainContent/momentItem.vue';
const heardInfoCollection={
  name:'收藏榜',
  number:'收藏数量'
}
const heardInfoGive={
  name:'点赞榜',
  number:'点赞数'
}



</script>

<style scoped lang="less">
.mainContent{
  max-width: 1300px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.moment-box{
  background-color: white;
  margin-right: 20px;
  flex: 1;
  height: 100%;
}
.ranking-box{
  display: flex;
  flex-direction: column;
  .ranking{
    flex: 1;
  }
}
</style>
