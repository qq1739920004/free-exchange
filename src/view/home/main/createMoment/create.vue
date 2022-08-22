<template>
  <div style="border-bottom: 1px solid #e8e8e8"></div>
  <div id="content">
    <div id="editor-container">
      <div id="title-container">
        <input placeholder="输入你的标题" />
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
          style="height: 850px;"
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
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const mode = ref<string>('default')
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('<p>点击全屏创作会体验更好哦</p>')



let toolbarConfig: any = {}
toolbarConfig.excludeKeys = [
  // 排除菜单组，写菜单组 key 的值即可
  'group-video'
]

const editorConfig = { placeholder: '请输入内容...'}
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
function handleChange(editor:any){
      const html = editor.getHtml()
      console.log( html)
}
</script>

<style scoped>
#top-container {
  border-bottom: 1px solid #e8e8e8;
  padding-left: 30px;
}

#editor-toolbar {
  width: 1350px;
  background-color: #fcfcfc;
  margin: 0 auto;
}
#content {
  background-color: rgb(245, 245, 245);
  position: relative;
}
::v-deep .w-e-select-list{
  top: 0;
}
#editor-container {
  width: 70%;
  margin: 30px auto 150px auto;
  background-color: #fff;
  padding: 20px 50px 50px 50px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
}
.toolbar{
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
