import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import home from './components/home/home.vue'
import type from './components/type/type.vue'
import writting from './components/writting/writting.vue'
import detail from './components/detail/detail.vue'
import reading from './components/reading/reading.vue'

import my from './components/my/my.vue'


import login from './components/login/login.vue'
import regiter from './components/register/register.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
    {
      path:'/',
      component:home
    },
    {
      path:'/my',
      component:my
    },
    {
      path:'/detail',
      name:'detail',
      component:detail
    },
    {
      path:'/reading',
      component:reading
    },
    {
      path:'/home',

      component:home
    },
    {
      path:'/type',
 
      component:type
    },
    {
      path:'/writting',
      name:writting,
      component:writting
    },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:'/register',
      name:'register',
      component:regiter
    }

  ]
})
