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

const LS_KEY = 'crowd-app-tabs'

export class AppTabsService {
  tabs: AppTabItem[] = []

  active: Nullable<AppTabItem> = null

  constructor(private routes: RouteConfig[]) {
    if (this.resumeTabs()) {
      //
    } else {
      const pinned = findRoute(this.routes, route => !!route.meta.pin)
      if (pinned) {
        this.add(pinned.meta.fullPath)
      }
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

    this.saveTabs()
  }

  add(path: string): AppTabItem {
    const route = findRoute(this.routes, route => route.meta.fullPath === path)
    if (!route) {
      throw new Error(`path ${path} no found`)
    }

    const tab: AppTabItem = {
      path,
      route,
      pin: Boolean(route.meta.pin)
    }

    this.tabs.push(tab)

    return tab
  }

  activeTabAndNavigate(path: string) {
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

  saveTabs() {
    localStorage.setItem(
      LS_KEY,
      JSON.stringify(
        this.tabs.map(tab => ({
          path: tab.path,
          active: tab === this.active
        }))
      )
    )
  }

  resumeTabs() {
    const value = localStorage.getItem(LS_KEY)
    if (!value) return false

    try {
      const path = JSON.parse(value) as { path: string; active: boolean }[]
      path.forEach(p => {
        this.add(p.path)
        if (p.active) {
          const active = this.find(p.path)
          if (active) {
            this.active = active
          }
        }
      })
      return true
    } catch (e) {
      //
    }
    return false
  }

  closeByIndex(index: number) {
    const [removed] = this.tabs.splice(index, 1)
    if (removed === this.active) {
      const next = Math.max(index - 1, 0)
      this.active = this.tabs[next]
    }
  }
}

export const appTabsService = Vue.observable(new AppTabsService(routes))
