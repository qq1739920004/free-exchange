//发表文章触发
import { ref ,reactive} from 'vue'
import {LFromItem,optionType} from '@/components/forml/types';
 const dialogVisible2 = ref(false)
 import type { FormInstance, FormRules } from 'element-plus'

 export const rules = reactive<FormRules>({
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur',
    },

  ],
  newPassword: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur',
    },
    { min: 5, max: 15, message: '密码长度为5~15个字符', trigger: 'change' },
    { min: 5, max: 15, message: '密码长度为5~15个字符', trigger: 'blur' },

  ],
  againPassword: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur',
    },
    { min: 5, max: 15, message: '密码长度为5~15个字符', trigger: 'change' },
    { min: 5, max: 15, message: '密码长度为5~15个字符', trigger: 'blur' },

  ],
})
//输入框forml的配置

const padding='10px'
 const formLabelAlign2:LFromItem[]=[
  {
    type:'password',
    field:'password',
    id:1,
    label:'原密码',
    placeholder: '请输入您的原密码',
    otherOptions:{
      padding:padding
    }

  },
  {
    type:'password',
    field:'newPassword',
    id:2,
    label:'新密码',
    placeholder: '请输入您的新密码',
    otherOptions:{
      padding:padding
    }

  },
  {
    type:'password',
    field:'againPassword',
    id:3,
    label:'确认新密码',
    placeholder: '请再次输入您的新密码',
    otherOptions:{
      padding:padding
    }

  },

]

const formData2=ref<any>({})

formLabelAlign2.forEach((item:LFromItem) => {
  formData2.value[`${item.field}`] = ''
})


export {dialogVisible2,formLabelAlign2,formData2}
