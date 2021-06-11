import Vue from 'vue'
import VueRouter from 'vue-router'
import { appTabsService } from '../service/AppTabsService'
import { routes } from './config'

Vue.use(VueRouter)

export const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach(to => {
  if (to.meta.title) {
    appTabsService.onRouterChange(to.path)
  }
})
