<template>
  <div class="tags">
    <h4 class="h4">文章子标签</h4>
    <el-tag
      v-for="tag in dynamicTags"
      :key="tag"
      class="mx-1 tagItem"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>
    <el-input
      v-if="inputVisible"
      ref="InputRef"
      v-model="inputValue"
      class="ml-1 w-20"
      size="small"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
       maxlength="10"
    />
    <el-button
      v-else
      class="button-new-tag ml-1"
      size="small"
      @click="showInput"
    >
      + 新增
    </el-button>
  </div>
</template>

<script setup lang="ts">
import {defineProps,withDefaults,ref,defineEmits,nextTick,watch} from 'vue';
import { ElInput } from 'element-plus'
import { ElMessage } from 'element-plus'
const InputRef = ref<InstanceType<typeof ElInput>>()
const inputValue = ref('')
const inputVisible = ref(false)
interface Props{
  dynamicTags:string[]
}
const emit=defineEmits(['update:dynamicTags'])
const props=withDefaults(defineProps<Props>(),{
})

let dynamicTags = ref([ ...props.dynamicTags ])
    watch(
      dynamicTags,
      (newValue) => {
        return emit('update:dynamicTags', newValue)
      },
      {
        deep: true
      }
    )

const showInput = () => {
  if(dynamicTags.value.length<3){
    inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
  }
  else{
    ElMessage({
    message: '最多只能有3个子标签',
    type: 'warning',
  })
  }

}
const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}
const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>

<style scoped>
.tagItem{
  margin: 5px 10px;
}
.w-20{
  width: 80px;
}
.h4{
  margin-top: 0px;
}
</style>
