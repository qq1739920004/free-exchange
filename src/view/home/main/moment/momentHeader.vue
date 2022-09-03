<template>
  <div  class="moment-header">
    <h1 class="title">{{momentDetail.title}}</h1>
    <!-- <div v-html="momentDetail"></div> -->
    <div class="author-box">
      <div class="authorInfo" >
        <img v-if="momentDetail.user?.avatarUrl" :src="momentDetail.user.avatarUrl" class="authorAvatar" >
        <div class="momentInfo">
          <span class="authorName"  v-if="momentDetail.user?.name">{{momentDetail.user.name}}</span>
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

const props=defineProps(['momentDetail'])
</script>

<style scoped lang='less'>
@huix:#aeb3bd;
.authorName{
  font-size: 22px;
  font-family: 'yy';
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
@font-face {
  font-family: 'yy';
  src: url('~@/assets/圆体.ttf');
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
