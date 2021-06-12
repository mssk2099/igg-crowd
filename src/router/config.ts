import { RouteConfig } from 'vue-router'
import { BasicLayout } from '../layouts'
import Home from '../views/Home.vue'
import { assignRoutes } from './utils'

/**
 * Route meta type defined in typing.ts
 */

export const dynamicRoutes: RouteConfig[] = [
  // 平台公告
  {
    path: 'notice',
    meta: { title: '平台公告' },
    children: [
      {
        path: 'list',
        meta: { title: '公告列表' },
        component: () => import('../views/notice/notice-list/index.vue')
      },
      { path: 'manage', meta: { title: '公告管理' } }
    ]
  },

  // 订单管理
  {
    path: 'project',
    meta: { title: '订单管理' },
    children: [
      { path: 'projects', meta: { title: '订单管理' } },
      { path: 'requirements', meta: { title: '报价参考' } },
      { path: 'price-query', meta: { title: '报价参考' } }
    ]
  },

  // 个人中心
  {
    path: 'user',
    meta: { title: '个人中心' },
    children: [
      { path: 'profile', meta: { title: '我的资料' } },
      { path: 'bank-info', meta: { title: '开户信息' } },
      { path: 'account', meta: { title: '我的账号' } },
      { path: 'staff', meta: { title: '员工管理' } },
      { path: 'coop-agreement', meta: { title: '平台协议' } }
    ]
  }
]

const staticRoutes: Array<RouteConfig> = [
  {
    path: '/u',
    children: [
      { path: 'login' },
      { path: 'signup' },
      { path: 'reset-password' },
      { path: 'set-password' }
    ]
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: 'home',
        meta: {
          title: '首页',
          pin: true,
          menu: { visible: false }
        },
        component: Home
      },
      ...dynamicRoutes
    ]
  },
  { path: '/403' },
  { path: '/404' },
  { path: '/503' }
]

export const routes = assignRoutes(staticRoutes)

console.log('routes', routes)
