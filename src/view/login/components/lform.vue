<template>
  <div>
    <el-form
      label-position="right"
      label-width="150px"
      ref="ruleFormRef"
      :model="userDate"
      :rules="rules"
      style="max-width: 400px"
      hide-required-asterisk
    >
      <el-form-item label="用户名:" prop="name">
        <el-input v-model="userDate.name" />
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="userDate.password" />
      </el-form-item>
    </el-form>
    <button @click="submitForm(ruleFormRef)">登录</button>
  </div>
</template>

<script setup lang="ts">
import {reactive} from 'vue';
import {rules,submitForm,ruleFormRef} from './ruleConfig';
let userDate=reactive({
  name:'',
  password:''
})
</script>

<style scoped>
::v-deep .el-form-item{
  margin: 40px 0 30px 0;
}
</style>
