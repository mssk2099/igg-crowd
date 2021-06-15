import Vue from 'vue'
import { EditService, ListService } from '../../core/crud'
import { Post } from './types'

class List extends ListService<Store, Post> {
  getFetchURL(): string {
    return '/posts'
  }
}

class Edit extends EditService<Store, Post> {
  getFetchURL(): string {
    return `/posts/${this.params.id}`
  }
  getSubmitURL(): string {
    return ''
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
