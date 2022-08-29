<template>
<div class="moment">
  <nav class="header"><span :class="['navItem',isActive==='推荐'?'itemActive':'']"  @click="recommend">推荐</span><span :class="['navItem',isActive==='最新'?'itemActive':'']" @click="newest">最新</span></nav>
  <div v-for="item in momentsInfo" :key="item.id" class="item" >
    <div class="content">
      <div class="moment-header">
        <span class="name">{{item.user.name}}</span>
        <span>{{timePurify(item.createAt)}}</span>
        <span>{{item.mainLabel}}</span>
        <p class="label"><el-tag class="tag" type='info' round size="small" v-for="item2 in item.label" :key="item2">{{item2}}</el-tag></p>
      </div>
      <h3 class="title">{{item.title}}</h3>
    </div>
    <img :src="item.cover" v-if="item.cover"  class="itemImage">
  </div>
</div>

</template>

<script setup lang="ts">
import {ref,defineProps,defineEmits,withDefaults, Ref} from 'vue';
import {getmoments} from '@/store/home/types';
import {storeToRefs} from 'pinia';
import {home} from '@/store/home/home';
import {timePurify} from '@/utils/timePurify';
// 1.点击推荐跟最新导航栏切换排序
//推荐跟最新导航栏的决定样式变量
const isActive=ref<string>('推荐')
  //推荐
  function recommend(){
    isActive.value='推荐'
  }
  //最新
  function newest(){
    isActive.value='最新'
  }

//获取动态数据
const homeStore=home()
const {momentsInfo}=storeToRefs(homeStore)
console.log(momentsInfo.value);


</script>

<style scoped lang="less">
  .navItem{
      color: #71777c;
      border-radius: 10px;
      font-size: 14px;
      cursor: pointer;
      &:hover{
        color: #007fff;
      }
  }
  .itemActive{
    color: #007fff;
  }
  .header{
    height: 40px;
    display: flex;
    align-items:center;
    border-bottom: 1px solid rgb(233, 233, 233);
    justify-content:start;
    font-size: 15px;
    span{
      margin: 18px;
    }
  }
.moment{
  display: flex;
  flex-direction: column;
}
.item{
  border-bottom: 1px solid rgb(233, 233, 233);
  height: 170px;
  padding: 10px 15px;
  display: flex;
  justify-content:space-between;
}
.moment-header{
 text-align: start;
 height: 30px;
 width: 100%;
 line-height: 30px;
 display: flex;
 margin-bottom: 5px;
  span{
    color: rgb(139, 137, 137);
    font-size: 15px;
  }
  &>span{
    padding: 0 20px;
    border-right: 1px solid #e7e8ec;

  }
  .label{
    padding-left: 20px;
    display: inline-flex;
    align-items: center;

    .el-tag{
      height: 18px;
      margin-right: 20px;
      font-size: 8px;
    }
  }
  .name{
    color: rgb(101, 101, 101);
  }
}
.title{
  text-align: start;
  margin: 0;
}
.content{
  height: 100%;
}
.itemImage{
  width: 200px;
  height: 133px;

  transform:translateY(35px);
}
</style>
