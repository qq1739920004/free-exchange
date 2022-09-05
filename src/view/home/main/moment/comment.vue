<template>
  <div class="comment" >
    <h4 class="title">评论</h4>
    <div class="create-comment">
      <img class="user-path" v-if="userInfo?.path" :src="userInfo.path" alt="">
      <reply-box  :momentId=props.momentId></reply-box>
    </div>
    <div >
      <h4 class="title2" ref='commentTarget'>全部评论</h4>
      <comment-item v-if="userInfo?.path" :momentId=props.momentId></comment-item>
      <h1 v-else>登录才可查看评论</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import replyBox from './comment/replyBox.vue';
import {moment} from '@/store/moment/moment';
import {ref,defineProps,defineExpose, onMounted} from 'vue'
import commentItem from './comment/commentItem.vue';
const userInfo=ref()
if(localStorage.getItem('user')){
  userInfo.value=JSON.parse(localStorage.getItem('user'))
}
const props=defineProps(['momentId'])

const commentTarget=ref(null)
onMounted(()=>{
// console.log(commentTarget.value);
})
defineExpose({commentTarget})
</script>

<style scoped lang='less'>

.comment{
  background-color: #ffffff;
  padding: 10px 30px;

  .title2{
    text-align: start     ;
  }
  .create-comment{
    display: flex;
    .user-path{
      margin-right: 15px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
  }
  }

}
</style>
