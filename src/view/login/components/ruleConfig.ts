import type { FormInstance, FormRules } from 'element-plus'
import {reactive,ref} from 'vue';
import { ElMessage } from 'element-plus'
 const rules = reactive<FormRules>({
  //用户名
  name: [
    { required: true,
      message: '用户名不能为空',
      trigger: 'blur' },
    { min: 2,
      max: 15,
      message: '用户名长度为2~15个字符',
      trigger: 'change' },
  ],
  //密码
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur',
    },
    { min: 5,
      max: 15,
      message: '密码长度为5~15个字符',
      trigger: 'change' },
  ],
})
//输入完用户名，密码后点击跳转所验证的地方
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  const vali=await formEl.validate((valid, fields) => {
    if (valid) return true
     else {
          ElMessage({
            type: 'warning',
            message: `请正确的输入用户名与密码`,
          })
    return false

    }
  })
 return vali
}

export {rules,submitForm}


