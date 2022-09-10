<template>
    <el-upload
    class="avatar-uploader"
    v-if="props.target=='picture' ? createMInfo?.id : true"
    :action="props.target=='picture' ? props.url+'?momentId='+ createMInfo.id : props.url"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :name="props.target"
    :headers="headers"
  >
    <img v-if="imageUrl" :src="imageUrl" :class="props.target" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script setup lang="ts">
import {ref,defineProps,defineEmits} from 'vue';
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import {createM} from '@/store/createM/createM';
import {storeToRefs} from 'pinia';
const imageUrl=ref<string>()
const emit=defineEmits(['successAvatar'])
const props=defineProps(['url','target'])
const createMStore=createM()
const {createMInfo} = storeToRefs(createMStore)
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  emit('successAvatar')
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}
const headers= {
        authorization:localStorage.getItem('token')
      }
//上传文件前的钩子
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type.slice(0,5) !== 'image') {
    ElMessage.error('上传的图片格式不对!')
    return false
  }
  return true
}
</script>

<style scoped>
::v-deep.avatar-uploader .el-upload {
  margin-top: 50px;
  border: 1px dashed #cdd0d6;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition:all .5s;
}

::v-deep.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

::v-deep.el-icon{
  font-size: 28px;
  color: #8c939d;
  width: 267px;
  height: 178px;
  text-align: center;
}
.picture{
  width: 267px;
  height: 178px;
}
.avatar{
  width: 200px;
  height: 200px;
}
</style>
