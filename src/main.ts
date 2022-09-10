import { createApp } from 'vue'
import App from './App.vue'

import {createPinia} from 'pinia';

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { router } from '@/router/index'
import '@/assets/css/global.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App)
const pinia=createPinia()
app.directive('title', (el, binding) => {
  // 这会在 `mounted` 和 `updated` 时都调用
  document.title=binding.value
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.mount('#app')








