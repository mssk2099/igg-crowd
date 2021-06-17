import { RouteConfig } from 'vue-router'
import { BlankLayout, BasicLayout } from '../layouts'
import Home from '../views/example/index.vue'
import { assignRoutes } from './utils'

/**
 * Route meta type defined in typing.ts
 */

export const dynamicRoutes: RouteConfig[] = [
  // 平台公告
  {
    path: 'notice',
    meta: { title: '公告' },
    component: BlankLayout,
    children: [
      {
        path: 'list',
        meta: { title: '公告列表' },
        component: () => import('../views/notice/notice-list/index.vue')
      },
      { path: 'manage', meta: { title: '公告管理' } }
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
  },

  // 基础管理
  {
    path: 'admin',
    meta: { title: '基础管理' },
    component: BlankLayout,
    children: [
      { path: 'departments', meta: { title: '组织架构' } },
      { path: 'projects', meta: { title: '项目管理' } },
      { path: 'permission-groups', meta: { title: '权限组配置' } },
      { path: 'rules', meta: { title: '角色授权' } }
    ]
  },

  // 平台管理
  {
    path: 'sys',
    meta: { title: '平台管理' },
    component: BlankLayout,
    children: [
      { path: 'tags', meta: { title: '标签管理' } },
      { path: 'tags-groups', meta: { title: '标签分类' } },
      {
        path: 'task-types',
        meta: { title: '制作内容' },
        component: () => import('../views/sys/task-types/index.vue')
      },
      { path: 'skill-types', meta: { title: '擅长领域' } },
      { path: 'send-message', meta: { title: '站内信' } },
      { path: 'ops-log', meta: { title: '操作日志' } },
      { path: 'rules', meta: { title: '角色授权' } },
      { path: 'menus', meta: { title: '菜单管理' } },
      { path: 'permissions', meta: { title: '权限项' } },
      { path: 'permission-groups', meta: { title: '权限组配置' } },
      { path: 'dict', meta: { title: '字典配置' } }
    ]
  }

  //
  // // 订单管理
  // {
  //   path: 'project',
  //   meta: { title: '订单管理' },
  //   children: [
  //     { path: 'projects', meta: { title: '订单管理' } },
  //     { path: 'requirements', meta: { title: '报价参考' } },
  //     { path: 'price-query', meta: { title: '报价参考' } }
  //   ]
  // },
  //
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

console.log('routes', JSON.parse(JSON.stringify(routes)))
