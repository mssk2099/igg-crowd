import { defaultErrorHandler, showMessage } from '../message'
import { GET, PaginationData } from '../request'

type ListFetchOption = {
  reset?: boolean
}

const log = require('debug')('ListService')

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

  searchValidator = () => Promise.resolve() as void | Promise<any>

  /**
   * Keep Store ref, then user could track typing in Component
   */
  constructor(protected store: Store) {
    this.search = this.initialSearchFormData()
    log('InitialFormData', this.search)
  }

  /**
   * Handle page index change event
   *
   * @public
   */
  public async handlePageIndexChange(index: number): Promise<void> {
    this.page = index
    await this.fetch()
  }

  /**
   * Handle search form submit event
   *
   * @public
   */
  public async handlerSearchSubmit(): Promise<void> {
    try {
      if (typeof this.searchValidator === 'function') {
        await this.searchValidator()
      }
      await this.fetch({ reset: true })
    } catch (e) {
      // TODO get validate info
      showMessage('请检查表单')
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

      log(`fetch ${url} with params`, params)

      const res = await GET(url, {
        data: params
      })

      const data = res.data as PaginationData<T>
      this.items = this.mapListItemsToVO(data.items)
      this.total = data.total
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
   * @param data
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
   *
   * @abstract
   */
  abstract getFetchURL(): string
}
