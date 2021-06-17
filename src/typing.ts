import { RouteConfig } from 'vue-router'

export type Nullable<T> = T | null

export type RouteMeta = {
  title?: string
  pin?: boolean
  menu?: { visible?: boolean }
  parent?: RouteConfig
  fullPath?: string
}

export enum EnableStatus {
  ENABLE = 1,
  DISABLE = 0
}
