import { defaultErrorHandler, showMessage } from '../message'
import { request } from '../request'

type ListFetchOption = {
  reset?: boolean
}

type PaginationData<T> = {
  list: T[]
  pagination: {
    current: number
    pageSize: number
    total: number
  }
}

const log = require('debug')('service:List')

const PageIndexBase = 1

/**
 * ListService<Store, T, S>
 *   T: list item typing
 *   S: search data typing
 */
export abstract class ListService<Store, T = unknown, S = unknown> {
  /**
   * List data
   */
  items = [] as T[]

  /**
   * Page index, start from 1
   */
  page = PageIndexBase

  /**
   * Page size
   */
  size = 20

  /**
   * Total
   */
  total = 0

  /**
   * loading state
   */
  loading = false

  /**
   * empty state
   */
  empty = false

  /**
   * Search from data
   */
  search = {} as Partial<S>

  searchValidator = (() => Promise.resolve()) as () => void | Promise<unknown>

  /**
   * Keep Store ref, then user could track typing in Component
   */
  constructor(protected store: Store) {
    this.search = this.initialSearchFormData()
    log('InitialFormData', this.search)
  }

  /**
   * Handle page index change event
   */
  public async handlePageIndexChange(index: number): Promise<void> {
    this.page = index
    await this.fetch()
  }

  /**
   * Handle search form submit event
   */
  public async handlerSearchSubmit(): Promise<void> {
    try {
      if (typeof this.searchValidator === 'function') {
        await this.searchValidator()
      }
    } catch (e) {
      showMessage('请检查表单是否填写完整')
      return
    }

    try {
      await this.fetch({ reset: true })
    } catch (e) {
      defaultErrorHandler(e)
    }
  }

  public async handlerSearchReset() {
    this.search = this.initialSearchFormData()
    await this.fetch({ reset: true })
  }

  async fetch(option?: ListFetchOption): Promise<void> {
    if (option?.reset) {
      this.page = PageIndexBase
    }

    this.loading = true
    this.empty = false
    this.items = []

    try {
      const url = this.getFetchURL()

      const params = {
        page: this.page,
        size: this.size,
        ...this.mapSearchParams()
      }

      log(`fetch ${url}`, params)

      const { list = [], pagination } = await request.get<
        any,
        PaginationData<unknown>
      >(url, {
        data: params
      })

      this.items = this.mapListItemsToVO(list)
      this.total = pagination?.total || 0
    } catch (e) {
      defaultErrorHandler(e)
    } finally {
      this.loading = false
      this.empty = !this.items.length
    }
  }

  /**
   * Provide a default value for search form
   */
  initialSearchFormData(): Partial<S> {
    return {}
  }

  /**
   * ListItemsDTO => ListItemsVO
   */
  mapListItemsToVO(data: unknown[]): T[] {
    return data as T[]
  }

  /**
   * Map search data to api params, return origin search default
   */
  mapSearchParams(): Record<string, unknown> {
    return this.search
  }

  /**
   * Should return a url in implement
   */
  abstract getFetchURL(): string
}
