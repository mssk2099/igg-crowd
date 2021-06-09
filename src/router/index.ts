import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { BasicLayout } from '../layouts'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/u',
    children: [
      {
        path: 'login'
      },
      {
        path: 'signup'
      },
      {
        path: 'reset-password'
      },
      {
        path: 'init-password'
      }
    ]
  },
  {
    path: '/',
    component: BasicLayout,
    children: [{ path: '', component: Home }]
  },
  {
    path: '/403'
  },
  {
    path: '/404'
  },
  {
    path: '/503'
  }
]

const router = new VueRouter({
  routes
})

export default router
