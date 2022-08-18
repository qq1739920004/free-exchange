import {createRouter,createWebHashHistory} from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'


const routes:RouteRecordRaw[]=[
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/home',
    name:'home',
    component:()=>import('@/view/home/home.vue')
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('@/view/login/login.vue')
  }
]

const router=createRouter({
  routes,
  history:createWebHashHistory()
})

export {
  router
}
