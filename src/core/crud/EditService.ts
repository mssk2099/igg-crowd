import { defaultErrorHandler, showMessage } from '../message'
import { request } from '../request'
import { ListService } from './ListService'

const log = require('debug')('service:Edit')

/**
 * EditService<Store, T, P>
 *   T: form-data typing
 *   P: edit params typing, use <T> default
 */
export abstract class EditService<Store = any, T = any, P = T> {
  /**
   * Modal visible sate
   */
  visible = false

  /**
   * Sign of form `create` or `edit` mode
   */
  isEdit = false

  /**
   * Form data
   */
  data = {} as T

  /**
   * initial params when begin editing
   */
  params = {} as P

  /**
   * initial form-data loading state
   */
  loading = false

  /**
   * user form-data saving state
   */
  saving = false

  validator = (() => Promise.resolve()) as () => void | Promise<unknown>

  constructor(protected store: Store) {}

  /**
   * @public
   */
  public onAdd(params: P): void {
    this.isEdit = false
    this.loading = false
    this.saving = false
    this.visible = true
    this.params = params
    this.data = this.getInitialFormData() as T
  }

  /**
   * Fetch form-data from api, or use params directly
   *
   * @public
   */
  public async onEdit(params: P) {
    this.isEdit = true
    this.loading = false
    this.saving = false
    this.visible = true
    this.params = params
    if (this.getFetchURL()) {
      this.data = this.getInitialFormData() as T
      await this.fetchFormData()
    } else {
      this.data = this.mapToFormData(params)
    }

    log('onEdit formData', this.data)
  }

  public async onEditSubmit() {
    this.saving = true

    try {
      if (typeof this.validator === 'function') {
        await this.validator()
      }
    } catch (e) {
      showMessage('请检查表单是否填写完整', 'warn')
      return
    }

    try {
      const url = this.getSubmitURL()
      const data = this.data

      log('onEditSubmit', url, data)

      await request.post(url, {
        data
      })

      this.visible = false
      await this.requestListReload()
    } catch (e) {
      defaultErrorHandler(e)
    } finally {
      this.saving = false
    }
  }

  public onCancel(): void {
    // TODO abort request
    this.visible = false
  }

  /**
   * @public
   */
  public async onRemove(params: P) {
    this.saving = true
    this.params = params

    try {
      const url = this.getRemoveURL()
      const params = {}

      log('onRemove', url, params)

      await request.delete(url, {
        params
      })

      await this.requestListReload()
    } catch (e) {
      defaultErrorHandler(e)
    } finally {
      this.saving = false
    }
  }

  async fetchFormData() {
    this.loading = true
    try {
      const url = this.getFetchURL()
      const params = this.getFetchParams()

      log('fetchFormData', url, params)

      const data = await request.get<unknown, unknown>(url, {
        params
      })
      this.data = this.mapToFormData(data)
    } catch (e) {
      defaultErrorHandler(e)
    } finally {
      this.loading = false
    }
  }

  getFetchParams(): Record<string, unknown> {
    return {}
  }

  mapToFormData(data: unknown): T {
    return data as T
  }

  /**
   * Return an initial FormData when `create`
   */
  getInitialFormData(): Partial<T> {
    return {}
  }

  async requestListReload() {
    await (this.store as { list?: ListService<unknown> }).list?.fetch()
  }

  /**
   * Should return url in implement
   */
  abstract getFetchURL(): string

  /**
   * Should return url in implement
   */
  abstract getSubmitURL(): string

  /**
   * Should return url in implement
   */
  abstract getRemoveURL(): string
}
