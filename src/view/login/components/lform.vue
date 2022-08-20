<template>
  <div class="lform">
    <el-form
      label-position="right"
      label-width="150px"
      ref="ruleFormRef"
      :model="userDate"
      :rules="rules"
      style="max-width: 400px"
      status-icon
    >


      <el-form-item label="用户名:"  prop="name">
        <el-input  v-model="userDate.name" />
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input show-password v-model="userDate.password" />
      </el-form-item>
    </el-form>
    <el-button type="primary" class="but" size="large" @click="startLogin(ruleFormRef)">{{
      props.butInfo
    }}</el-button>
    <el-alert class=" animate__animated" v-if="props.butInfo==='注册'" title="注册成功的话，我们会自动帮你登录跳转首页哦~" type="info" center :closable='false'/>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineProps, defineEmits } from 'vue'
import { rules, submitForm } from './ruleConfig'
import { loginStore } from '@/store/login/login'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'

const emit = defineEmits(['loginChange'])
const ruleFormRef = ref<FormInstance>()

const props = defineProps({
  butInfo: String
})
let userDate = reactive({
  name: '',
  password: ''
})

function startLogin(ruleFormRef: FormInstance | undefined) {
  submitForm(ruleFormRef).then((res) => {
    if (!res) return
    //如果用户输入的没有问题

    if (props.butInfo === '登录') {
     loginStart()
    } else if (props.butInfo === '注册') {
      loginStore.actions.register(userDate).then((result) => {
        if (!result) {
          ElMessage({
            type: 'error',
            message: `用户名已存在`
          })
        } else {
          ElMessage({
            type: 'success',
            message: `注册成功~`
          })
          loginStart()
        }
      })
    }
  })
}

//登录的方法
function loginStart(){
   loginStore.actions.login(userDate).then((result) => {
        if (!result) {
          ElMessage({
            type: 'error',
            message: `用户名或者密码错误`
          })
        } else {
          //保存token
          emit('loginChange')
          ElMessage({
            type: 'success',
            message: `欢迎您来到free社区~`
          })
        }
      })
}
</script>

<style scoped lang="less">
::v-deep .el-form-item {
  margin: 40px 0 30px 0;
}
.login{
  position: relative;
}
.el-alert{
  width: 400px;
  position: absolute;
  left: 0;
  right: 0;
  top: -10px;
  border-radius: 5px;
  animation: backInDown 1.5s ;
  margin:10px auto  0px auto;
  height: 30px;
  float: left;
  ::v-deep .el-alert__title{
    font-size: 14px;
    line-height:30px ;
  }
}

.but{
  transform:translateY(-10px);
  margin-bottom: 10px;
}

</style>
