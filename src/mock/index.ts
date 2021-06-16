import MockAdapter from 'axios-mock-adapter'
import { request } from '../core/request'
import { posts } from './posts'

export const initAxiosMock = () => {
  const mock = new MockAdapter(request, { delayResponse: 500 })
  posts(mock)
}
