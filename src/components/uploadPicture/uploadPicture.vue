<template>
    <el-upload
    class="avatar-uploader"
    v-if="createMInfo?.id"
    :action="props.url+'?momentId='+ createMInfo.id"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    name="picture"
    :headers="headers"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script setup lang="ts">
import {ref,defineProps} from 'vue';
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import {createM} from '@/store/createM/createM';
import {storeToRefs} from 'pinia';
const imageUrl=ref<string>()
const props=defineProps(['url'])
const createMStore=createM()
const {createMInfo} = storeToRefs(createMStore)
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
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

::v-deep.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 267px;
  height: 178px;
  text-align: center;
}
.avatar{
  width: 267px;
  height: 178px;
}
</style>
