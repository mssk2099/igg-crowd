import Vue from 'vue'
import { EditService, ListService } from '../../../core/crud'
import { TaskType } from './types'

class List extends ListService<Store, TaskType> {
  getFetchURL(): string {
    return '/settings/module'
  }
}

class Edit extends EditService<Store, TaskType> {
  getFetchURL(): string {
    return `/settings/module/${this.params.module_id}`
  }

  getSubmitURL(): string {
    return this.isEdit
      ? `/settings/module/${this.params.module_id}`
      : '/settings/module'
  }

  getRemoveURL(): string {
    return `/settings/module/${this.params.module_id}`
  }
}

export class Store {
  list: List
  edit: Edit

  constructor() {
    this.list = Vue.observable(new List(this))
    this.edit = Vue.observable(new Edit(this))
  }
}
