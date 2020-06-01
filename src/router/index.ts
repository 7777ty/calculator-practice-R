import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '@/views/Login.vue';
import SignUp from  '@/views/SignUp.vue'
import Calculate from '@/views/Calculate.vue'
import Records from '@/views/Records.vue'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component:SignUp
    },
    {
      path: '/calculate/:username',
      name: 'Calculate',
      component:Calculate
    },
    {
      path: '/calculate/:username/:recordID',
      name: 'Calculate',
      component:Calculate
    },
    {
      path: '/records/:username',
      name: 'Records',
      component: Records
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
