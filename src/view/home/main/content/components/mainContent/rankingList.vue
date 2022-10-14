<template>
  <div class="ranking-one" v-if="list?.length">
    <el-card  class="box-card" >
      <template #header>
        <div class="card-header">
          <h3 class="title">{{props.heardInfo.name}}</h3>
        </div>
      </template>
      <div class="list">
        <div class="vice-title">
          <span class="order">排名</span>
          <span class="vice-title-title">标题</span>
          <span class="number">{{props.heardInfo.number}}</span>
        </div>
        <div class="list-item" v-for="(item,index) in list" @click="goMomentDetail(item.id,index)" :key="item.id">
          <img v-if="index===0" class="honor" src="~@/assets/img/冠军.png" alt="">
          <img v-if="index===1" class="honor" src="~@/assets/img/亚军.png" alt="">
          <img v-if="index===2" class="honor" src="~@/assets/img/季军.png" alt="">
          <span class="order">{{index+1}}</span>
          <span class="vice-title-title title-item">{{item.title}}</span>
          <span class="number"  v-if="props.rankingName=='giveCount'">{{item.giveCount}}</span>
          <span class="number"  v-if="props.rankingName=='collectionCount'">{{item.collectionCount}}</span>

        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {defineProps,ref} from 'vue';
import {home} from '@/store/home/home';
import {getmoments} from '@/store/home/types';
import {useRouter} from 'vue-router';
const props=defineProps(['heardInfo','rankingName'])
const homeStore = home()
const list=ref<getmoments[]>()
async function lcreate(){
  const result=await homeStore.rankingList(props.rankingName)
  list.value=result
}
lcreate()

//点击跳转详情
const router=useRouter()
async function goMomentDetail(momentId:number,index:number){
  let routeUrl = router.resolve({
          path:`/free/moment/${momentId}`,
          query:{order:index}
     });
     window.open(routeUrl.href, '_blank');
}
</script>

<style scoped lang='less'>
.title{
  margin: 0;
}
.honor{
  width: 30px;
  height: 30px;
  position: absolute;
  top: -10px;
  left: -8px;
}
.list-item{
  position: relative;
  min-width: 300px;
  padding: 8px 0;
  border-bottom: 1px solid rgb(235, 234, 233);
  cursor: pointer;
  &:hover{
    background-color: aliceblue;
  }
  &:nth-child(2),&:nth-child(3),&:nth-child(4){
    font-size: 15px;
  }
}
::v-deep .el-card__body{
  padding: 8px 7px 0px;
}
.vice-title{
  border-bottom: 1px solid rgb(237, 237, 237);
  padding-bottom: 10px ;
  color: rgb(166, 166, 166);

}

.vice-title,.list-item{
  display: flex;
  .vice-title-title{
    text-align: start;
    flex: 1;
  }
  .title-item{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .order{
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .number{
    padding: 0 8px 0 28px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.card-header{
  width: 100%;
}
.ranking-one{
  font-size: 14px;

}
</style>
