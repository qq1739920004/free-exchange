<template>
<div class="box">
  <div class="content-box"   v-html="momentInfo.content">

  </div>
<div class="but" v-if="userInfo?.path">
      <el-tooltip
        class="box-item"
        effect="light "
        content="收藏"
        :offset='5'
        :hide-after='0'
        :enterable='false'
        placement="left"
      >
      <span class="iconbox" @click="collection"  :class="{isActive:momentInfo.isCollection}"><span class="iconspan" :class="{activeaa:momentInfo.isCollection && isonecollection }"></span><StarFilled class="icon gicon"/></span>
      </el-tooltip>
      <el-tooltip
        class="box-item"
        effect="light "
        content="点赞"
        :offset='5'
        :hide-after='0'
        :enterable='false'
        placement="left"
      >
      <span class="iconbox"  @click="give" :class="{isActive:momentInfo.isGive}"><span class="iconspan" :class="{activeaa:momentInfo.isGive && isoneGive }"></span><CaretTop class="icon gicon"/></span>
      </el-tooltip>
      <el-tooltip
        class="box-item"
        :offset='5'
        effect="light "
        content="评论"
        :hide-after='0'
        :enterable='false'
        placement="left"
      >
      <span ><ChatRound class="icon comment"/></span>
      </el-tooltip>


    </div>
</div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import {moment} from '@/store/moment/moment';
import {defineProps,ref} from 'vue';
import {getmoments} from '@/store/home/types';
import {pris} from './prism.js';
import { ElMessage } from 'element-plus'
import {storeToRefs} from 'pinia';
import {timePurify} from '@/utils/timePurify';
import { useRouter,useRoute } from 'vue-router';
import {home} from '@/store/home/home';
const userInfo=ref()
if(localStorage.getItem('user')){
  userInfo.value=JSON.parse(localStorage.getItem('user'))
}
// 1.代码高亮配置
pris()
//2.点赞，收藏的变色逻辑
const route=useRoute()
const {order}=route.query
const momentStore=moment()
const {momentInfo}=storeToRefs(momentStore)
const homeStore=home()
const isGive=ref<boolean>(false)
const isCollect=ref<boolean>(false)
const isoneGive=ref<number>(0)//刷新界面的时候不许动画
const isonecollection=ref<number>(0)//刷新界面的时候不许动画
//请求点赞，取消点赞
async function give(e){
  e.stopPropagation();
  isoneGive.value=1
  if(!momentInfo.value.isGive){
    momentInfo.value.isGive=1
    momentInfo.value.giveCount+=1
  }
  else{
    momentInfo.value.isGive=undefined
    momentInfo.value.giveCount-=1
  }
  await homeStore.startGive(momentInfo.value.id)
}
async function collection(e){
  e.stopPropagation();
  isonecollection.value=1
  if(!momentInfo.value.isCollection){
    momentInfo.value.isCollection=1
    momentInfo.value.collectionCount+=1
    ElMessage({
    message: '收藏成功!',
    type: 'success',
  })
  }
  else{
    momentInfo.value.isCollection=undefined
    momentInfo.value.collectionCount-=1
    ElMessage({
    message: '取消收藏!',
    type: 'info',
  })
  }
  await homeStore.startCollection(momentInfo.value.id)
}
</script>

<style scoped lang='less'>
@import '~@/assets/css/prism.css';
@activeColor:#007fff;

#top-container {
  border-bottom: 1px solid #e8e8e8;
  padding-left: 30px;
}

#editor-toolbar {
  width: 1200px;
  background-color: #fcfcfc;
  margin: 0 auto;
}
#content {
  background-color: rgb(245, 245, 245);
  position: relative;
}
::v-deep .w-e-select-list {
  top: 0;
  bottom: unset;
}
#editor-container {
  width: 70%;
  margin: 30px auto 150px auto;
  background-color: #fff;
  padding: 20px 50px 50px 50px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
}
.toolbar {
  position: sticky;
  top: 0px;
  z-index: 99;
}
#title-container {
  padding: 20px 0;
  border-bottom: 1px solid #e8e8e8;
}

#title-container input {
  font-size: 30px;
  border: 0;
  outline: none;
  width: 100%;
  line-height: 1;
}

#editor-text-area {
  min-height: 850px;
  margin-top: 20px;
}
.box{
    background-color: #ffffff;
    padding: 10px 30px;
    margin-bottom: 20px;
}
.but{
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 300px;
    width: 100px;
    flex-direction: column;
    position: fixed;
    top: 100px;
    left:-59px ;
    &:hover{
        transition:all .6s;
        width: 400px;
        &>span{
        background-color: rgb(228, 227, 227);
        transition:all .6s;
        }
      }
    color: #858b90;
    font-size: 14px;
    span{
      width: 80px;
      height: 80px;
      background-color: rgb(95, 94, 94);
      border-radius: 50%;
      margin-right: 30px;
      user-select: none;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        transition: .8s;
        transform:rotate(360deg);
      }

    }

    .isActive{
      color: @activeColor;
    }
  }

.icon{
  width: 50px;
  height: 50px;
  position: relative;
}
.comment{
  width: 40px;
  height: 40px;
}
.iconbox{
  position: relative;
  .iconspan{
  content: '';
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: @activeColor;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%);
}
.activeaa{
  animation: activeRound 0.3s;
}
}

@keyframes activeRound{
  93%{
    box-shadow: 0 80px 0px 4px,
  0px -80px 0 4px,
  60px -60px 0 4px,
  80px 0px 0 4px,
  -80px 0px 0 4px,
  -60px 60px 0 4px,
  -60px -60px 0 4px,
  60px 60px 0 4px
  ;
  }
  100%{
    box-shadow: 0 0px 0,
  0px 0px 0,
  0px 0px 0,
  0px 0px 0,
  0px 0px 0,
  0px 0px 0,
  0px 0px 0,
  0px 0px 0
  ;
  }
}
</style>
