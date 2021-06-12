import { pascalCase } from 'change-case'
import path from 'path'
import { RouteConfig } from 'vue-router'
import { RouteMeta } from '../typing'

/**
 * - Compute `fullPath` of route
 * - Compute `name` of component
 *
 * @example { path: 'profile', meta: { fullPath: '/user/profile' } }
 */
export const assignRoutes = (routes: RouteConfig[]) => {
  function dfs(routes: RouteConfig[], parent?: RouteConfig) {
    routes.forEach(route => {
      route.meta = route.meta || {}

      const meta: RouteMeta = route.meta

      meta.parent = parent

      meta.fullPath = parent
        ? path.join(parent.meta.fullPath, route.path)
        : route.path || '/'

      const name = pathToName(route.path)
      route.name = parent ? `${parent.name || ''}${name}` : name

      if (route.children) {
        dfs(route.children, route)
      }
    })
  }

  dfs(routes)

  return routes
}

export const findRoute = (
  routes: RouteConfig[],
  predicate: (route: RouteConfig) => boolean
): RouteConfig | null => {
  let result: RouteConfig | null = null

  function dfs(routes: RouteConfig[]) {
    routes.forEach(route => {
      if (predicate(route)) {
        result = route
      } else if (route.children) {
        dfs(route.children)
      }
    })
  }

  dfs(routes)

  return result
}

const pathToName = (path: string) => pascalCase(path.replace(/^\//, ''))
