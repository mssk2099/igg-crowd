// eslint-disable-next-line
import { UserLayout, BasicLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '' },
    redirect: '/home/workplace',
    children: [
      // home
      {
        path: '/home',
        name: 'home',
        redirect: '/home/workplace',
        component: RouteView,
        meta: { title: 'menu.home', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
        children: [

          {
            path: '/home/workplace',
            name: 'Workplace',
            component: () => import('@/views/home/Workplace'),
            meta: { title: 'menu.home.workplace', keepAlive: true, permission: ['dashboard'] }
          }
        ]
      },

      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: 'menu.exception', icon: 'warning', permission: ['exception'] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: 'menu.exception.not-permission', permission: ['exception'] }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: 'menu.exception.not-find', permission: ['exception'] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: 'menu.exception.server-error', permission: ['exception'] }
          }
        ]
      }

    ]
  },

  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
