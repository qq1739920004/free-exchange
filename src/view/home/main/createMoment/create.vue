<template>
  <div id="content">
    <div id="editor-container">
      <div id="title-container">
        <input placeholder="请输入你的标题" @input="titleChange" v-model="inputValue" />
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
import { onBeforeUnmount, ref, shallowRef, onMounted,watch} from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import {createM} from '@/store/createM/createM';
import {storeToRefs} from 'pinia';
import {debounce} from '@/utils/debounce';
import {BASE_URL} from '@/service/request/config';
import {useRouter} from 'vue-router';
//页面逻辑
const router=useRouter()
let inputValue=ref<string>('请输入您的标题')
const createMStore=createM()
let {isHome,createMInfo}=storeToRefs(createMStore)
const tempId=localStorage.getItem('tempId')
//这是动态的id
let id=0
if ( tempId ){
  id=createMInfo.value?.id || parseInt(tempId)
}
else{
  // 如果没有id则返回首页让用户重新点击创建文章，因为id是在那里获取的，如果没有则是用户直接链接访问
  router.push('/free')
}
//拿到此用户上次编辑的信息
    createMStore.getTemp().then(()=>{
      valueHtml.value=createMInfo.value?.content
      inputValue.value=createMInfo.value?.title
  })

onMounted(()=>{
  isHome.value=false

})
// 富文本逻辑
const mode = ref<string>('default')
const editorRef = shallowRef()
// 内容 HTML
const valueHtml = ref()
let toolbarConfig: any = {}
toolbarConfig.excludeKeys = [
  // 排除菜单组，写菜单组 key 的值即可
  'group-video'
]
let MENU_CONF:any={}
const editorConfig = { placeholder: '点击全屏创作会体验更好哦',MENU_CONF}
editorConfig.MENU_CONF['uploadImage'] = {
      server: `${BASE_URL}/upload/temp/picture?momentId=${id}`,
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
  isHome.value=true

})

//输入改变触发
let html2:string
function handleChange(this:any,editor:any){
      const html:string = editor.getHtml()
       if(html2!==html && createMInfo.value?.id && html2 && html2!=='<p><br></p>'){
        console.log(html2);
        debounce(createMStore.setTempContent,2000,[id,html])
      }
      html2=html
}
//标题变化
function titleChange(this:any){
      if(createMInfo.value?.id && inputValue.value!=='请输入您的标题'){
        debounce(createMStore.setTempTitle,2000,[id,inputValue.value])
      }
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

#editor-text-area {
  min-height: 850px;
  margin-top: 20px;
}
</style>
