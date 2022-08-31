<template>
  <div class="content-box" v-html="momentInfo.content">

    </div>
    <pre><code class="language-javascript">const a = 100;
function fn(x) { return x + 10 };
// 注释
</code></pre>

</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import {moment} from '@/store/moment/moment';
import {defineProps,ref} from 'vue';
import {getmoments} from '@/store/home/types';
import {pris} from './prism.js';
const props=defineProps(['momentInfo'])
pris()

</script>

<style scoped lang='less'>
@import '~@/assets/css/prism.css';
#top-container {
  border-bottom: 1px solid #e8e8e8;
  padding-left: 30px;
}

#editor-toolbar {
  width: 1200px;
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
  width: 70%;
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
