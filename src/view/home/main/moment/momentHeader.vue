<template>
  <div  class="moment-header">
    <h1 class="title">{{momentDetail.title}}</h1>
    <!-- <div v-html="momentDetail"></div> -->
    <div class="author-box">
      <div class="authorInfo" >
        <img  @click="goThisUser(momentDetail.user.id,$event)" v-if="momentDetail.user?.avatarUrl" :src="momentDetail.user.avatarUrl" class="authorAvatar" >
        <div class="momentInfo">
          <span class="authorName"  v-if="momentDetail.user?.nameTure">{{momentDetail.user.nameTure}}</span>
          <div class="textInfo">
            <span >发布于: {{timePurify2(momentDetail.createTime,'YYYY年MM月DD日 HH:mm分 ')}} <span class="dian">·</span></span>
            <span>点赞数量: {{momentDetail.giveCount}}</span>
            <span>收藏数量: {{momentDetail.collectionCount}}</span>
          </div>
        </div>
      </div>
      <el-button type="primary" plain class="author-system" size="default" >个人中心</el-button>
    </div>
    <img class="cover" :src="momentDetail.cover" alt="">
    <div class="digest">
       <h1 class="util-title">文章摘要</h1>
      <p class="digest-text">{{momentDetail.digest}}</p>
    </div>
    <h1 class="util-title">文章内容</h1>
  </div>
</template>

<script setup lang="ts">
import {defineProps,ref} from 'vue';
import {timePurify2} from '@/utils/timePurify';
import {useRouter} from 'vue-router';
import {user} from '@/store/user/user';
import {storeToRefs} from 'pinia';
const props=defineProps(['momentDetail'])
console.log(props.momentDetail);

const router=useRouter()
const userStore=user()
const {uid} =storeToRefs(userStore)
//1.跳转到此用户主页
async function goThisUser(userId,e){
  e.stopPropagation();
  router.push({path:'/free/space',query:{id:userId}})
  userStore.$reset()
  uid.value=userId
  userStore.getUserInfo(userId)
  await userStore.getUserCollect()
}
</script>

<style scoped lang='less'>
@huix:#aeb3bd;

.authorName{
  font-size: 22px;
  font-family: '黑体';
  }
.moment-header{
  background-color: #ffffff;
  padding: 10px 30px;

}
.author-box{
  min-width: 900px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  margin-bottom: 40px;
}
.title{
  margin-top: 20px;
  margin-bottom: 30px;
  text-align: center;
  padding: 10px 0 50px;
  border-bottom: 2px solid #ebebec;
}
.authorInfo{
  display: flex;
  justify-content: start;
  align-items: center;
  .authorAvatar{
  cursor: pointer;

    width: 60px;
    margin-right: 15px;
    height: 60px;
    border-radius: 50%;
  }

  span{
    margin-right: 20px;
  }
  .dian{
    font-size: 22px;
  }
  .momentInfo{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    .textInfo{
      color: @huix;
      display: flex;
      justify-content: center;
      align-items: center;
    }

  }

}
.cover{
  width: 900px;
}

.util-title{
  text-align: start;
  padding: 10px 0 20px;
  border-bottom: 2px solid #ebebec;
}
.digest{
  text-align: start;
  .digest-text{
    font-size: 20px;

  }
}
</style>
