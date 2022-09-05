<template>
  <div class="mainContent">
    <moment-item  class="moment-box"></moment-item>
    <div class="ranking-box">
        <ranking-list class="ranking" :heardInfo=heardInfoGive rankingName='giveCount'></ranking-list>
        <ranking-list class="ranking" :heardInfo=heardInfoCollection rankingName='collectionCount'></ranking-list>
    </div>

  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import rankingList from './mainContent/rankingList.vue';
import momentItem from './mainContent/momentItem.vue';
const heardInfoCollection={
  name:'收藏榜',
  number:'收藏数'
}
const heardInfoGive={
  name:'点赞榜',
  number:'点赞数'
}



</script>

<style scoped lang="less">
@media (max-width: 900px){
  .mainContent{
    flex-direction: column;;
  }
  .moment-box{
  width: 100%;
}
  }
.mainContent{
  max-width: 1300px;
  width: 100%;
  display: flex;
  justify-content: center;

}
.moment-box{
  flex: 1;
  background-color: white;
  margin-right: 20px;
  min-width: 800px;
}
.ranking-box{
  flex: 0.5;
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  .ranking{
    margin-bottom: 10px;
  }
}
</style>
