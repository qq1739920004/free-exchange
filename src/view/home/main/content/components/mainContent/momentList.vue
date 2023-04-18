<template>
<div class="list">
  <div :infinite-scroll-delay='1000'   v-infinite-scroll="load"   :infinite-scroll-disabled="disabled">
  <div @click="goMoment(item.id,index)"    v-for="(item,index) in momentsInfo" :key="item.id" class="item" >
    <div class="content">
      <div class="moment-header">
        <span class="name" @click="goUserspace(item.user.id,$event)" v-if="item.user.nameTure">{{item.user.nameTure}}</span>
        <span v-if="item.createAt">{{timePurify(item.createAt)}}</span>
        <span v-if="item.mainLabel">{{item.mainLabel}}</span>
        <p class="label" ><el-tag class="tag" type='info' round size="small" v-for="item2 in item.label" :key="item2">{{item2}}</el-tag></p>
      </div>
      <h3 class="title">{{item.title}}</h3>
      <p class="digest">{{item.digest}}</p>
    <div class="but">
      <el-tooltip
      :auto-close='1000'
        class="box-item"
        effect="light "
        content="收藏"
        :offset='5'
        :hide-after='0'
        :enterable='false'
        placement="top"
      >
      <span class="iconbox" @click="collection(item,index,$event)"  :class="{isActive:item.isCollection}"><span class="iconspan" :class="{activeaa:item.isCollection && isonecollection==index }"></span><StarFilled class="icon gicon"/>{{item.collectionCount}}</span>
      </el-tooltip>
      <el-tooltip
        class="box-item"
        effect="light "
        content="点赞"
        :offset='5'
        :hide-after='0'
        :enterable='false'
        placement="top"
      >
      <span class="iconbox"  @click="give(item,index,$event)" :class="{isActive:item.isGive}"><span class="iconspan" :class="{activeaa:item.isGive && isoneGive==index  }"></span><CaretTop class="icon gicon"/>{{item.giveCount}}</span>
      </el-tooltip>

      <el-tooltip
        class="box-item"
        :offset='5'
        effect="light "
        content="评论"
        :hide-after='0'
        :enterable='false'
        placement="top"
      >
      <span ><ChatRound class="icon comment"/>{{item.comentCount}}</span>
      </el-tooltip>


    </div>
    </div>
    <img :src="item.cover" v-if="item.cover"  class="itemImage" />
  </div>
    <p class="hint" v-if="loading">加载中......</p>
    <p class="hint" v-if="noMore">不要再卷了，已经没有文章啦(ㄒoㄒ)~~</p>
  </div>
  </div>
</template>

<script setup lang="ts">
import {ref,defineEmits,computed, onMounted,nextTick,watch} from 'vue';
import {getmoments} from '@/store/home/types';
import {storeToRefs} from 'pinia';
import {home} from '@/store/home/home';
import 'animate.css';
import {timePurify} from '@/utils/timePurify';
import { ElMessage } from 'element-plus'
import {moment} from '@/store/moment/moment';
import { useRouter } from 'vue-router';
import {userRights} from '@/utils/islogin';
import {pageType} from '@/service/home/type';
import momentsNav from './momentsNav.vue';


// 1.点击推荐跟最新导航栏切换排序
//推荐跟最新导航栏的决定样式变量
//2.请求文章的代码
  const homeStore=home()
const {pageInfo,limit}=storeToRefs(homeStore)


//获取文章数据
const {momentsInfo}=storeToRefs(homeStore)
console.log(momentsInfo);
//3.点赞，收藏的变色逻辑
const isGive=ref<boolean>(false)
const isCollect=ref<boolean>(false)
const isoneGive=ref<number>(-1)//刷新界面的时候不许动画
const isonecollection=ref<number>(-1)//刷新界面的时候不许动画
//请求点赞，取消点赞
async function give(item:getmoments,index:number,e){
  e.stopPropagation();

  if(!userRights()) {
    ElMessage.error('请先登录再进行此操作')
    return
  }
  isoneGive.value=index
  if(!momentsInfo.value[index].isGive){
    momentsInfo.value[index].isGive=1
    momentsInfo.value[index].giveCount+=1
  }
  else{
    momentsInfo.value[index].isGive=undefined
    momentsInfo.value[index].giveCount-=1
  }
  await homeStore.startGive(item.id)
}
async function collection(item:getmoments,index:number,e){
  e.stopPropagation();

  if(!userRights()) {
    ElMessage.error('请先登录再进行此操作')
    return
  }
  isonecollection.value=index
  if(!momentsInfo.value[index].isCollection){
    momentsInfo.value[index].isCollection=1
    momentsInfo.value[index].collectionCount+=1
    ElMessage({
    message: '收藏成功!',
    type: 'success',
  })
  }
  else{
    momentsInfo.value[index].isCollection=undefined
    momentsInfo.value[index].collectionCount-=1
    ElMessage({
    message: '取消收藏!',
    type: 'info',
  })
  }
  await homeStore.startCollection(item.id)
}
// 4.跳转到文章详情表
const momentStore=moment()

const router=useRouter()
async function goMoment(momentId,index){
  const res=await momentStore.getMomentDetail(momentId)
  let routeUrl = router.resolve({
          path:`/free/moment/${momentId}`,
          query:{order:index}
     });
     window.open(routeUrl.href, '_blank');
}
// 5.下拉刷新
const disabled=ref(true)
const loading = ref(false)
const noMore = computed(() => !limit.value)

async function load(){
  if(limit.value && disabled.value===false){
    loading.value=true
    disabled.value=true
    if(pageInfo.value.method!=='rand'){
      pageInfo.value.start=pageInfo.value.end
    }
    pageInfo.value.end+=5
    await homeStore.addgetsMoment()
    loading.value=false
    disabledChange(1000)
  }
}
function disabledChange(time:number){
  setTimeout(()=>{
    disabled.value=false
    },time)
}
//6.跳转到用户中心
function goUserspace(userId:number,e){
  e.stopPropagation()
  router.push({path:'/free/space',query:{id:userId}})
}
// 7.修复了切换分类，点赞跟收藏的动画会执行一次的bug
 watch(
      momentsInfo,
      (newValue) => {
        isoneGive.value=-1//刷新界面的时候不许动画
        isonecollection.value=-1
      }
    )
onMounted(() => {
  disabledChange(2000)
})
</script>

<style scoped lang='less'>
@activeColor:#007fff;
.icon{
  width: 20px;
  height: 20px;
  margin-right: 8px;
  position: relative;
}
.iconbox{
  position: relative;
  .iconspan{
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: @activeColor;
  position: absolute;
  left: 10px;
  transform: translate(-50%);
}
.activeaa{
  animation: activeRound 0.3s;
}
}

@keyframes activeRound{
  93%{
    box-shadow: 0 20px 0px,
  0px -20px 0,
  15px -15px 0,
  20px 0px 0,
  -20px 0px 0,
  -15px 15px 0,
  -15px -15px 0,
  15px 15px 0
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
.comment{
  width: 16px;
  height: 16px;
}
  .but{
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 15px;
    padding-left: 10px;
    color: #858b90;
    font-size: 14px;
    span{
      margin-right: 30px;
      user-select: none;
      display: flex;
      align-items: center;
      &:hover .gicon{
        box-shadow: 0px 2px 0px;
      }
    }
    .isActive{
      color: @activeColor;
    }
  }

.digest{
  word-break: break-word;
  min-width: 550px;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  padding-right: 20px;
  font-size: 14px;
  color: #858b90;

}
.item{
  border-bottom: 1px solid rgb(233, 233, 233);
  height: 170px;
  padding: 10px 15px;
  display: flex;
  text-align: start;
  position: relative;
  justify-content:space-between;
  cursor: pointer;
  &:hover{
    background-color: #fbfbfb;
  }
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
  max-width: 550px;
  text-align: start;
  margin: 0;
  white-space:nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 10px;
  &:hover{
    text-decoration:underline;
  }
}
.content{
  height: 100%;
}
.itemImage{
  width: 200px;
  height: 126px;
  transform:translateY(35px);
  margin-right: 20px;
}
.hint{
  height: 50px;
  color: @activeColor;
  font-size: 14px;
  animation: flash 1.5s infinite;
}
</style>
