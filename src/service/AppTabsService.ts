import Vue from 'vue'
import { RouteConfig } from 'vue-router'
import { router } from '../router'
import { routes } from '../router/config'
import { findRoute } from '../router/utils'
import { Nullable } from '../typing'

export type AppTabItem = {
  path: string
  route: RouteConfig
  pin: boolean
}

class AppTabsService {
  tabs: AppTabItem[] = []

  active: Nullable<AppTabItem> = null

  constructor(private routes: RouteConfig[]) {
    const pinned = findRoute(this.routes, route => !!route.meta.pin)
    if (pinned) {
      this.tabs.push({
        path: pinned.meta.fullPath,
        route: pinned,
        pin: true
      })
      this.active = this.tabs[0]
    }
  }

  onRouterChange(path: string) {
    console.log('AppTabsService onRouterChange', path)

    const tab = this.find(path)
    if (!tab) {
      this.active = this.add(path)
    } else {
      this.active = tab
    }
  }

  add(path: string): AppTabItem {
    const route = findRoute(this.routes, route => route.meta.fullPath === path)
    if (!route) {
      throw new Error(`path no found: ${path}`)
    }

    const tab: AppTabItem = {
      path,
      route,
      pin: Boolean(route.meta.pin)
    }

    this.tabs.push(tab)

    return tab
  }

  setActive(path: string) {
    const tab = this.find(path)

    if (!tab) {
      throw new Error(`tab no found: ${path}`)
    }

    if (tab === this.active) {
      return
    }

    this.active = tab

    router.push({ path: tab.path })
  }

  find(path: string) {
    return this.tabs.find(tab => tab.path === path)
  }

  closeByIndex(index: number) {
    this.tabs.splice(index, 1)
    const next = Math.max(index--, 0)
    this.active = this.tabs[next]
  }
}

export const appTabsService = Vue.observable(new AppTabsService(routes))
