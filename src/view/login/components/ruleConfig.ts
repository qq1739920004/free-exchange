import type { FormInstance, FormRules } from 'element-plus'
import {reactive,ref} from 'vue';
export const rules = reactive<FormRules>({
  name: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur',
    },
    { min: 5, max: 15, message: '密码长度为5~15个字符', trigger: 'change' },
  ],
})
export const ruleFormRef = ref<FormInstance>()
//输入完用户名，密码后点击跳转所验证的地方
export const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}


