import {createRouter,createWebHashHistory} from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'


const routes:RouteRecordRaw[]=[
  {
    path:'/',
    redirect:'/free'
  },
  {
    path:'/free',
    name:'free',
    component:()=>import('@/view/home/home.vue'),
    children:[
      {path:'',component:()=>import('@/view/home/main/content/content.vue')},
      {path:'create',component:()=>import('@/view/home/main/createMoment/create.vue')}
    ]
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
router.beforeEach((to)=>{
  if(to.name!='login' && to.path!='/free'){
    if (!localStorage.getItem('token')) {
      return { name: 'login' }
    }
  }

})
export {
  router
}
