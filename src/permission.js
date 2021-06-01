import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { i18nRender } from '@/locales'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${i18nRender(to.meta.title)} - ${domTitle}`))

  if (store.getters.addRouters.length === 0) {
    store.dispatch('GenerateRoutes', {}).then(() => {
      // 动态添加可访问路由表
      router.addRoutes(store.getters.addRouters)
      // 请求带有 redirect 重定向时，登录自动重定向到该地址
      const redirect = decodeURIComponent(from.query.redirect || to.path)
      if (to.path === redirect) {
        // set the replace: true so the navigation will not leave a history record
        next({ ...to, replace: true })
      } else {
        // 跳转到目的路由
        next({ path: redirect })
      }
    })
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
