<template>
<div v-if="isShow">
  <div :infinite-scroll-delay='1500'  v-infinite-scroll="load"   :infinite-scroll-disabled="disabled" class="list">
    <div class="itembox" @click="goMoment(item.momentAll ? item.momentAll[0].id : item.id)"  v-for="(item,index) in userCollect" :key="item.momentAll ? item.momentAll[0].id : item.id">
      <div class="item">
        <div class="item-left">
          <div class="user-img">
            <img @click="goThisUser(item.useru?.id || item.user.id,$event)" class="user-image" :src="item.useru?.avatarUrl || item.user.avatar" alt="">
          </div>
          <div class="item-info">
            <div class="item-user">
              <h5 class="h h-p">{{item.useru?.name || item.user.name}}</h5>
              <span class="time">{{timePurify2(item.momentAll ? item.momentAll[0].createTime : item.createAt,'YYYY年MM月DD日 HH:mm分 ')}}</span>
            </div>
            <div class="moment-info">
              <h4 class="h h-pc">{{item.momentAll ? item.momentAll[0].title : item.title}}</h4>
              <p class="digest">{{item.momentAll ? item.momentAll[0].digest : item.digest}}</p>
            </div>
          </div>
        </div>
        <div class="item-right" v-show="route.query.id==id2 && method=='用户文章'">
          <span   @click="deleteMoment(item.momentAll ? item.momentAll[0].id : item.id,index,$event)">删除</span>
          <span   @click="goChangeMoment(item,$event)">修改文章</span>

        </div>
      </div>
      <div class="but">
        <span class="butchidren iconbox" @click="collection(item.momentAll ? item.momentAll[0].id : item.id,index,$event)"  :class="{isActive:item.isCollection}"><span class="iconspan" :class="{activeaa:item.isCollection && isonecollection==index }"></span><StarFilled class="icon gicon"/>{{item.collectionCount}}</span>
        <span class="butchidren iconbox"   @click="give(item.momentAll ? item.momentAll[0].id : item.id,index,$event)" :class="{isActive:item.isGive}"><span class="iconspan" :class="{activeaa:item.isGive && isoneGive==index  }"></span><CaretTop class="icon gicon"/>{{item.giveCount}}</span>
        <span class="butchidren" ><ChatRound class=" icon comment"/>{{item.comentCount}}</span>
      </div>
    </div>

  </div>
  <p class="hint" v-show="loading && limit">加载中......</p>
  <p class="hint" v-show="!limit">不要再卷了，已经没有文章啦(ㄒoㄒ)~~</p>
</div>
</template>

<script setup lang="ts">
import {ref,computed,onMounted,defineProps} from 'vue';
import {storeToRefs} from 'pinia';
import {user} from '@/store/user/user';
import 'animate.css';
import {moment} from '@/store/moment/moment';
import {userRights} from '@/utils/islogin';
import {home} from '@/store/home/home';
import {useRouter,useRoute} from 'vue-router';
import {timePurify2} from '@/utils/timePurify';
import { ElMessage, ElMessageBox } from 'element-plus'
import useStore from 'element-plus/es/components/table/src/store';
const route=useRoute()

const props=defineProps(['navtext','id'])
const id2=JSON.parse(localStorage.getItem('user')).id

// 1.请求数据
const homeStore=home()

const userStore=user()
const {userCollect,limit,pageInfo,method,uid} =storeToRefs(userStore)


//2.点赞，收藏的变色逻辑
const isGive=ref<boolean>(false)
const isCollect=ref<boolean>(false)
const isoneGive=ref<number>(-1)//刷新界面的时候不许动画
const isonecollection=ref<number>(-1)//刷新界面的时候不许动画
//请求点赞，取消点赞
async function give(id:string | number,index:number,e){
  e.stopPropagation();

  if(!userRights()) {
    ElMessage.error('请先登录再进行此操作')
    return
  }
  isoneGive.value=index
  if(!userCollect.value[index].isGive){
    userCollect.value[index].isGive=1
    userCollect.value[index].giveCount+=1
  }
  else{
    userCollect.value[index].isGive=undefined
    userCollect.value[index].giveCount-=1
  }
  await homeStore.startGive(id)
}
async function collection(id:string | number,index:number,e){
  e.stopPropagation();
  if(!userRights()) {
    ElMessage.error('请先登录再进行此操作')
    return
  }
  isonecollection.value=index
  if(!userCollect.value[index].isCollection){
    userCollect.value[index].isCollection=1
    userCollect.value[index].collectionCount+=1
    ElMessage({
    message: '收藏成功!',
    type: 'success',
  })
  }
  else{
    userCollect.value[index].isCollection=undefined
    userCollect.value[index].collectionCount-=1
    ElMessage({
    message: '取消收藏!',
    type: 'info',
  })
  }
  await homeStore.startCollection(id)

}
// 3.下拉配置
const disabled=ref(true)
const loading = ref(false)
async function load(){
  console.log(333333333);
  if((props.navtext!==method.value && disabled.value===false) || userCollect.value?.length<5) return
    loading.value=true
    disabled.value=true
    pageInfo.value.start+=5
    await userStore.addUserCollect()
    loading.value=false
    disabledChange(1500)
}
let time=0
function disabledChange(time:number){
  if(time) clearTimeout(time)
  time=setTimeout(()=>{
    disabled.value=false
    },time)
}
let isShow=ref(false)
onMounted(() => {
  userStore.$reset()
  uid.value=route.query.id
  userStore.getUserInfo(route.query.id)
  disabledChange(1500)
  isShow.value=true
})
//4.打开文章详情
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
//5.跳转到此用户主页
async function goThisUser(userId,e){
  e.stopPropagation();
  router.push({path:'/free/space',query:{id:userId}})
  userStore.$reset()
  uid.value=userId
  userStore.getUserInfo(userId)
  await userStore.getUserCollect()
}
//7.修改文章
function goChangeMoment(item:any,e){
  e.stopPropagation()
   let routeUrl = router.resolve({
          path:`/free/change/${item.id}`,
     });
     window.open(routeUrl.href, '_blank');
}
// 6.删除用户文章
async function deleteMoment(id:number,index,e) {
  e.stopPropagation()
  ElMessageBox.confirm(
    '你确定要删除此文章?一旦删除不可恢复哦',
    '删除文章',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
      userStore.deleteMoment(id,index).then(()=>{
        ElMessage({
        type: 'success',
        message: '删除成功',
      })
      })
    })
}
</script>

<style scoped lang='less'>
@activeColor:#007fff;

.itembox{
  display: flex;
  flex-direction: column;
  background-color: white;
  border-bottom: 1px solid rgb(226, 227, 226);
  margin-bottom: 10px;
  border-radius: 5px;
   &:hover{
    background-color: #fafafa;
  }
}
.hint{
  height: 50px;
  color: @activeColor;
  font-size: 14px;
  animation: flash 1.5s infinite;
}
.digest{
  margin: 0;
}

.user-img{
  margin-right: 7px;
}
.user-image{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.list{
  min-height: 50vh;
  box-sizing: border-box;
  background-color: #f4f5f5;
}
.item-info{
  text-align: start;
}
.time{
  font-size: 13px;
  color:#b4b5b5 ;
}
.item{
  cursor: pointer;
  padding: 25px 10px;
  display: flex;
  justify-content: space-between;
  .item-right{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    font-size: 14px;
    margin-right: 15px;
    color: #b4b5b5;
    cursor: pointer;
      span{
      margin-bottom: 10px;
      &:hover{
        color: @activeColor;
      }
    }
  }
  .item-left{
    display: flex;

  }
}
.h{
  margin: 0;
}
.h-p{
  padding: 7px 5px;
  font-size: 15px;
}
.h-pc{
  max-width: 800px;
  padding: 8px 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
   &:hover{
    text-decoration:underline;
  }
}
.digest{
  max-width: 800px;
  word-break: break-word;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  padding-right: 20px;
  font-size: 14px;
  color: #858b90;
}
  .but{
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #858b90;
    border: 1px solid #eff0f0;
    font-size: 14px;
    .butchidren{
      flex: 1;
      text-align: center;
      display: flex;
      justify-content: center;
      border-right: 1px solid #eff0f0;
      &:hover{
        background-color: #eff0f0;
      }

    }
    span{
      user-select: none;
      display: flex;
      align-items: center;
    }
    .isActive{
      color: @activeColor;
    }
  }
  .icon{
  width: 30px;
  height: 30px;
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
  left: 50%;
  top: 50%;
  transform: translateX(-210%);

}
.activeaa{
  animation: activeRound 0.3s;
}
}
.comment{
  width: 23px;
  height: 23px;
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
</style>
