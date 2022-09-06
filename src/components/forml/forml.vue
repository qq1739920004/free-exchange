<template>
  <div>
    <el-form
    :label-width="props.lwidth"
    style="max-width: 460px"
  >
  <template v-for="item in props.formLabelAlign" :key="item.id">
    <el-form-item    label-position="right"
 :label="item.label+':'">

    <template v-if="item.type=='input'">
      <el-input  :placeholder="item.placeholder" v-model="formData[`${item.field}`]" />
    </template>
    <template v-if="item.type=='select'">
       <el-select
          v-model="formData[`${item.field}`]"
          :placeholder="item.placeholder"
          style="width: 100%"
          >
          <el-option
          v-for="item2 in item.options"
          :key="item2.value"
          :value="item2.value"
          :label="item2.title"
          >
          </el-option>
        </el-select>
    </template >
    <template v-if="item.type=='textarea'">
      <el-input  :placeholder="item.placeholder" minlength="30" :maxlength="item.otherOptions?.maxleng || 200" :autosize="{ minRows: 5}" show-word-limit type="textarea" v-model="formData[`${item.field}`]" />
    </template>
    <template v-if="item.type=='upload'">
      <upload-picture url="http://43.138.182.103:8888/upload/temp/picture/cover"></upload-picture>
    </template>

    </el-form-item>

  </template>

  </el-form>
  </div>
</template>

<script setup lang="ts">
import {defineProps,withDefaults,ref,defineEmits,watchEffect,watch} from 'vue';
import {LFromItem} from './types';
import uploadPicture from '@/components/uploadPicture/uploadPicture.vue'
console.log('object');

interface Props{
  formLabelAlign:LFromItem[]
  formData:any
  lwidth:string
}
const emit=defineEmits(['update:formData'])
const props=withDefaults(defineProps<Props>(),{
  lwidth:'150px'
})
let formData = ref({ ...props.formData })
    watch(
      formData,
      (newValue) => {
        return emit('update:formData', newValue)
      },
      {
        deep: true
      }
    )

</script>

<style scoped>

</style>
