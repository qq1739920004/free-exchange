<template>
  <div id="content">
    <div id="editor-container">
      <el-button type="success" class="save" size="large" @click="saveData">确认修改</el-button>
      <div id="title-container">
        <input placeholder="请输入你的标题" @input="titleChange"  v-model="inputValue" />
      </div>
      <div id="editor-text-area">
        <Toolbar
          class="toolbar"
          style="border-bottom: 1px solid #ccc"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="mode"
        />
        <Editor
          style="height: 850px"
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
          @onChange="handleChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted,watch,defineProps} from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import {changeM} from '@/store/changeM/changeM';
import {storeToRefs} from 'pinia';
import {debounce} from '@/utils/debounce';
import {BASE_URL} from '@/service/request/config';
import {useRouter,useRoute} from 'vue-router';
//页面逻辑
const changeMStore=changeM()
const {title,content}=storeToRefs(changeMStore)
const route=useRoute()
const router=useRouter()
const inputValue=ref('')
const valueHtml = ref('')
const id=ref(route.params.momentId)
createL()
async function createL(){
 await changeMStore.getMoment(id.value)
 inputValue.value=title.value
 valueHtml.value=content.value
}
// 富文本逻辑
const mode = ref<string>('default')
const editorRef = shallowRef()
// 内容 HTML
let toolbarConfig: any = {}
toolbarConfig.excludeKeys = [
  // 排除菜单组，写菜单组 key 的值即可
  'group-video'
]
let MENU_CONF:any={}
const editorConfig = { placeholder: '点击全屏创作会体验更好哦',MENU_CONF}
editorConfig.MENU_CONF['uploadImage'] = {
      server: `${BASE_URL}/upload/temp/picture?momentId=${id.value}`,
      fieldName: 'picture',
      headers: {
        authorization:localStorage.getItem('token')
      }
    }
const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
//输入改变触发
let html:string
function handleChange(this:any,editor:any){
      html= editor.getHtml()
      console.log(html);
}
//标题变化
function titleChange(this:any){
      console.log(inputValue.value);
}

function saveData(){
   ElMessageBox.confirm(
    '确认保存后不可回退哦~',
    '修改文章',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
      changeMStore.setMoment(id.value,html,inputValue.value).then(()=>{
        ElMessage({
        type: 'success',
        message: '保存成功！',
      })
      router.push(`/free/moment/${id.value}`)
      })
    })
}




</script>

<style scoped>
#top-container {
  border-bottom: 1px solid #e8e8e8;
  padding-left: 30px;
}

#editor-toolbar {
  width: 1000px;
  background-color: #fcfcfc;
  margin: 0 auto;
}
#content {
  background-color: rgb(245, 245, 245);
  position: relative;
}
::v-deep .w-e-select-list {
  top: 0;
  bottom: unset;
}
#editor-container {
  width: 1000px;
  margin: 30px auto 150px auto;
  background-color: #fff;
  padding: 20px 50px 50px 50px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
}
.toolbar {
  position: sticky;
  top: 0px;
  z-index: 99;
}
#title-container {
  padding: 20px 0;
  border-bottom: 1px solid #e8e8e8;
}

#title-container input {
  font-size: 30px;
  border: 0;
  outline: none;
  width: 100%;
  line-height: 1;
}
.save{
  margin-bottom: 50px;
}
#editor-text-area {
  min-height: 850px;
  margin-top: 20px;
}
</style>
