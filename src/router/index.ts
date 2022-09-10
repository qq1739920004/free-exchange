import {createRouter,createWebHashHistory} from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes:RouteRecordRaw[]=[
  {
    path:'/',
    redirect:'/free',
  },
  {
    path:'/free',
    name:'free',
    meta:{title:'首页'},
    component:()=>import('@/view/home/home.vue'),
    children:[
      {path:'',component:()=>import('@/view/home/main/content/content.vue'),},
      {path:'create',component:()=>import('@/view/home/main/createMoment/create.vue'),meta:{title:'创建文章'}},
      {path:'moment/:momentId',name:'moment',component:()=>import('@/view/home/main/moment/moment.vue')},
      {path:'moment/search',name:'search',component:()=>import('@/view/home/main/searchTaget/searchTaget.vue')},
      {path:'space',name:'space',component:()=>import('@/view/home/main/userSpace/userSpace.vue')},

    ]
  },
  {
    path:'/login',
    name:'login',
    meta:{title:'登录'},
    component:()=>import('@/view/login/login.vue')
  }
]

const router=createRouter({
  routes,
  history:createWebHashHistory()
})
router.beforeEach((to,from,next)=>{
  if(to.meta.title){
    document.title=to.meta.title
  }
  if(to.name!='login' && to.path!='/free' && to.name!='moment'){
    if (!localStorage.getItem('token') || !localStorage.getItem('user')) {
      return { name: 'login' }
    }
  }

  next( )

})

export {
  router
}
