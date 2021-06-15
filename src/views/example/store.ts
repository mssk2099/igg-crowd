import { ListService } from '../../core/crud'
import { Post } from './types'

class List extends ListService<Store, Post> {
  getFetchURL(): string {
    return '/posts'
  }
}

export class Store {
  list: List

  constructor() {
    this.list = new List(this)
  }
}
