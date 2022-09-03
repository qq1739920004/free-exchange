<template>
  <div class="comment-box" v-if="commentInfo.length">
    <div class="item" v-for="(item,index) in commentInfo" :key="item.id">
      <div class="user-info">
        <div class="name-box">
          <span class="time-item1">{{timePurify(item.createAt)}}</span>
          <span class="delete-item" v-if="userInfo.id===item.user.id" @click="deleteComment(item.id)">删除</span>
          <img class="user-path" :src="item.user.avatarUrl" alt="">
          <div class="content">
            <span class="name">{{item.user.name}}</span>
            <p class="content-value">{{item.content}}</p>
            <div class="give-box botmargin">
              <span class="iconbox"  @click="give(item.id,index)" :class="{isActive:item.isGive}"><span class="iconspan" :class="{activeaa:item.isGive && isoneGive==index  }"></span><CaretTop class="icon gicon"/>{{item.giveCount}}</span>
              <span class="reply-box"><ChatRound class="icon comment"/>{{item.children ? item.children.length : 0}}</span>
              <span class="reply" @click="showBox(index)">回复</span>
            </div>
            <reply-box :belong=item.id :toCommentId=item.id v-show="showSomeBox===index" @lfocue="isfocue" :isshow="showSomeBox===index" :momentId=props.momentId></reply-box>
            <div class="showChildren" v-show="item.children && !isShowChidren.includes(index)" @click="showChildren(index)" >查看更多评论</div>
            <div class="children" v-show="item.children && isShowChidren.includes(index)">
              <div class="children-item" v-for="(item2,index2) in item.children" :key="item2.id">
                <div class="childrenInf-box">
                  <img class="user-path"  :src="item2.user.avatarUrl" alt="">
                  <div class="content">
                    <span class="name">{{item2.user.name}} <span v-if="item2.toUser" ><span class="platext"> 回复: </span> {{item2.toUser}}</span></span>
                    <p class="content-value">{{item2.content}}</p>
                    <span class=""><span class="reply"  @click="showBox(index2+'q')">回复 </span><span class="delete-item2" v-if="userInfo.id===item2.user.id" @click="deleteComment(item2.id)">删除</span></span>
                    <reply-box :belong=item.id :toCommentId=item2.id v-show="showSomeBox===index2+'q'" @lfocue="isfocue" :isshow="showSomeBox===index2+'q'" :momentId=props.momentId></reply-box>
                  </div>
                </div>
                <span class="time-item">{{timePurify(item2.createTime)}}</span>

              </div>
              <div class="hidden-chidren" @click="hiddenChidren(index)">收起</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watch,defineProps} from 'vue';
import {home} from '@/store/home/home';
import {moment} from '@/store/moment/moment';
import {storeToRefs} from 'pinia';
import {timePurify} from '@/utils/timePurify';
import replyBox from './replyBox.vue';
import { ElMessage, ElMessageBox } from 'element-plus'

const props=defineProps(['momentId'])

const momentStore=moment()
const {momentInfo,commentInfos}=storeToRefs(momentStore)
  watch(
      commentInfos,
      (newValue) => {
         commentInfo.value=commentInfos.value
      },
      {
        deep: true
      }
    )

// 1.请求评论数据
const commentInfo=ref([])
async function lcreate(){
  await momentStore.getComment(momentInfo.value.id)
  console.log(commentInfo.value);
}
lcreate()
//2.点赞，收藏的变色逻辑
const isGive=ref<boolean>(false)
const isoneGive=ref<number>(-1)//刷新界面的时候不许动画
const homeStore=home()
const {momentsInfo}=storeToRefs(homeStore)
//请求点赞，取消点赞
async function give(commentId:number,index:number){
  isoneGive.value=index
  if(!commentInfo.value[index].isGive){
    commentInfo.value[index].isGive=1
    commentInfo.value[index].giveCount+=1
  }
  else{
    commentInfo.value[index].isGive=undefined
    commentInfo.value[index].giveCount-=1
  }
  await homeStore.startGive(momentInfo.value.id,commentId)
}
//3.是否显示评论的评论
const isShowChidren=ref([])
function showChildren(index:number){
  isShowChidren.value.push(index)
}
function hiddenChidren(index:number){
  isShowChidren.value.splice(isShowChidren.value.indexOf(index),1)
}
//4.决定显示评论框
const showSomeBox=ref(-1)
function showBox(index:number){
  showSomeBox.value=index
}
function isfocue(){
  showSomeBox.value=-1
}
//5.删除评论逻辑
// 获取当前登录的用户
const user=localStorage.getItem('user')
function deleteComment(commentId:number){
  ElMessageBox.confirm(
    '您确定要删除吗？',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      momentStore.deleteComment(commentId,props.momentId)
      ElMessage({
        type: 'success',
        message: '删除成功!',
      })
    })
}
//6.是否显示的功能按钮（根据当前登录用户）
const userInfo=ref()
if(localStorage.getItem('user')){
  userInfo.value=JSON.parse(localStorage.getItem('user'))
}

</script>

<style scoped lang='less'>
@activeColor:#007fff;
@showChdren:rgb(55, 122, 236);
.content-value{
  display: block;
  max-width: 600px;
}
.showChildren{
  width:100px ;
  margin-bottom: 10px;
  font-size: 14px;
  color: rgb(138, 137, 137);
  cursor: pointer;
  &:hover{
    color: @showChdren;
  }
}
.time-item1{
  font-size: 13px;
  position: absolute;
  color: rgb(190, 189, 189);
  top: 37px;
  right: 0;

}
.time-item{
  font-size: 13px;
  position: absolute;
  color: rgb(190, 189, 189);
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}
.delete-item{
  font-size: 13px;
  position: absolute;
  z-index: 9;
  color: rgb(113, 113, 113);
  top: 73px;
  right: 0;
  cursor: pointer;
  &:hover{
    color: @activeColor;
  }
}
.delete-item2{
  font-size: 13px;
  z-index: 9;
  color: rgb(113, 113, 113);
  margin-left: 10px;
  cursor: pointer;
  &:hover{
    color: @activeColor;
  }
}
.hidden-chidren{
  position: absolute;
  right: 20px;
  bottom: 5px;
  font-size: 14px;
  color: rgb(90, 89, 89);
  cursor: pointer;
  &:hover{
    color: @showChdren;
  }

}
.childrenInf-box{
  display: flex;
  justify-content: space-between;
}
.platext{
  font-size: 13px;
  color: #494949;
}
 .iconspan{
  width: 1px;
  height: 1px;
  border-radius: 50%;
  background-color: @activeColor;
  z-index: -9;
  position: absolute;
  left: 9px;
  transform: translate(-50%);
}
.isActive{
      color: @activeColor;
    }
.botmargin{
      margin-bottom: 20px;

    }
.give-box{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  color:#6d6d6d ;
  .icon{
  width: 18px;
  height: 18px;
  margin-right: 5px;
  cursor: pointer;

  }
  .activeaa{
  animation: activeRound 0.3s;
}
  .iconbox{
        margin-right: 30px;
      }
  span{
      display: flex;
      align-items: center;
      &:hover{
        color: @activeColor;
      }

  }
  .comment{
    width: 14px;
    height: 14px;
  }
  .reply-box{
     margin-right: 30px;

  }


}
.reply{
        cursor:pointer;
        font-size: 13px;
        color: rgb(148, 147, 147);
        &:hover{
          color: @showChdren;
        }
    }
.content{
  width: 100%;
   transform: translateY(5px);
   p{
    font-size: 14px;
   }
}
.item{
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f6f6f6;
}
.name-box{
  position: relative;
}
.name-box,.children-item{
  display: flex;
  align-items: flex-start;
}
.children{
  min-width:800px ;
  background-color: #f6f5f5;
  padding: 8px 10px;
  padding-right: 20px;
}

.children-item{
  width: 100%;
  position: relative;
  margin-bottom: 20px;
}
.name{
  font-size: 17px;
  color: rgb(190, 189, 189);
}
.user-info{
  position: relative;
}
.comment-box{
  text-align: start;
}
.user-path{
      margin-right: 15px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      text-align: start;
  }
@keyframes activeRound{
  93%{
    box-shadow: 0 20px 0px 2px,
  0px -20px 0 2px,
  15px -15px 0 2px,
  20px 0px 0 2px,
  -20px 0px 0 2px,
  -15px 15px 0 2px,
  -15px -15px 0 2px,
  15px 15px 0 2px
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
