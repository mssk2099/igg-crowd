import MockAdapter from 'axios-mock-adapter'
// @ts-ignore
import mockjs from 'mockjs'
import { request } from '../core/request'

export const initAxiosMock = () => {
  const mock = new MockAdapter(request, { delayResponse: 500 })

  mock.onGet('/api/posts').reply(200, {
    error: 0,
    message: 'success',
    data: mockjs.mock({
      'items|20': [
        {
          'id|+1': 1,
          title: '@ctitle',
          content: '@csentence'
        }
      ],
      total: 55
    })
  })
}
