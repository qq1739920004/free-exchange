<template>
     <el-dialog
    v-model="dialogChange"
    :title="props.h"
    width="30%"
  >
  <div class="forml">
    <forml v-if="props.dynamicTags?.length" :formLabelAlign="props.formLabelAlign" lwidth="180px" v-model:dynamic-tags="dynamicTags"   v-model:form-data="formData"></forml>
    <forml  v-else :rules=rules  @successAvatar=commitFrom :formLabelAlign="props.formLabelAlign" lwidth="180px"    v-model:form-data="formData"></forml>
  </div>
     <template v-if="props.isdynamicTags">
      <tagsl v-if="props.isdynamicTags" v-model:dynamic-tags="dynamicTags"></tagsl>
    </template>
    <template #footer v-if='!isAvartar'>
      <span class="dialog-footer">
        <el-button @click="dialogChange = false">取消</el-button>
        <el-button type="primary" @click="commitFrom"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>


</template>

<script setup lang="ts">
import {defineProps,ref,withDefaults,defineEmits,watchEffect,watch} from 'vue';
import forml from '@/components/forml/forml.vue';
import {LFromItem} from '../forml/types';
import tagsl from '@/components/tags/tags.vue';
import { ElMessage} from 'element-plus'

const emit=defineEmits(['update:dialogVisible','update:formData','update:dynamicTags','commitFrom'])
interface Props{
  h:string,
  dialogVisible:boolean,
  formLabelAlign:LFromItem[],
  formData:any,
  dynamicTags?:string[],
  isdynamicTags?:boolean,
  rules?:any,
  isAvartar?:boolean
}
const props=withDefaults(defineProps<Props>(),{
  h:'对话框',
  dialogVisible:false,
  isdynamicTags:false
})
const dialogChange=ref<boolean>(props.dialogVisible)
 watchEffect(() => {
      dialogChange.value = props.dialogVisible
    })
watch(dialogChange, (newValue) => emit('update:dialogVisible', newValue))


let formData = ref({...props.formData})
    watch(
      formData,
      (newValue) => {
         emit('update:formData',newValue)
      },
      {
        deep: true
      }
    )

let dynamicTags = ref([])
if(props.dynamicTags?.length){
  dynamicTags.value=[ ...props?.dynamicTags ]
    watch(
      dynamicTags,
      (newValue) => {
        return emit('update:dynamicTags', newValue)
      },
      {
        deep: true
      }
    )
}

function commitFrom(){
  console.log(formData.value.digest );
  if(formData.value.mainLabel || formData.value.digest)
    {
    if(!formData.value.mainLabel || !formData.value.digest){
      ElMessage({
          type: 'error',
          message: '请填写完信息',
        })
    }
    else if(formData.value.digest.length<30){
      ElMessage({
          type: 'error',
          message: '文章摘要至少要30字',
        })
    }

    else{
      dialogChange.value = false
      emit('commitFrom',formData.value)
    }
  }
  else{
    dialogChange.value = false
    emit('commitFrom',formData.value)
  }

}

</script>

<style scoped>
.forml{
  margin-top: 10px;
  margin-bottom: 50px;
}
</style>
