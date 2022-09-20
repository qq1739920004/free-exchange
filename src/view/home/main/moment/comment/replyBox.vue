<template>
  <div class="replyB">
     <el-input
        type="textarea"
        :autosize="{ minRows: 3,maxRows: 6}"
        :maxlength='200'
        :disabled="userInfo?.path ? false : true"
        :placeholder="userInfo?.path ? '请输入评论...' : '请先去登录'"
        v-model="contentValue"
        @focus="isShowbut=true"
        @blur="isfocue"
        >
      </el-input>
      <transition name=ani class="animate__animated  ani">
        <el-button type="primary" class="but"  plain v-show="isShowbut" @click="createComment">发表评论</el-button>
      </transition>
  </div>
</template>

<script setup lang="ts">
import {ref,defineProps, watch,defineEmits} from 'vue'
import {moment} from '@/store/moment/moment';
import 'animate.css';
import { ElMessage } from 'element-plus'

const userInfo=ref()
if(localStorage.getItem('user')){
  userInfo.value=JSON.parse(localStorage.getItem('user'))
}

const momentStore=moment()


const props=defineProps(['momentId','toCommentId','belong','isshow'])
//是否显示（用于失去焦点消失）
const serviceEnd=ref(false)
const emit=defineEmits(['lfocue'])
function isfocue(){
    isShowbut.value=false
  if(isShowbut.value===false && contentValue.value===''){
    emit('lfocue')
  }

}

//评论
const contentValue=ref('')
//发表评论
const isShowbut=ref(false)//是否显示发表评论的按钮
async function createComment(e){
  if(contentValue.value===''){
    console.log(props.toCommentId,props.belong);
    ElMessage({
    message: '请先输入!',
    type: 'info',
    })
  }
  else{
    if(props.toCommentId && props.belong){
      await momentStore.createCommentChidren(props.momentId,contentValue.value,props.belong,props.toCommentId)
    }
    else{
      await momentStore.createComment(props.momentId,contentValue.value)
    }
      contentValue.value=''
      isfocue()
  }

}
</script>

<style scoped lang='less'>
.but{
  margin-bottom: 10px;
}
.replyB{
  width: 100%;
}
::v-deep .el-textarea__inner{
  background: #f2f3f5;
  margin-bottom: 10px;
  &:focus{
    background: white;
  }
}
.ani-enter-active{
  animation:flipInX .7s;
}
.ani-leave-active{
  animation:flipOutX .7s;
}

.replyB{
  margin-top: 14px;
}
</style>
