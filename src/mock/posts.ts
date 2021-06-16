import MockAdapter from 'axios-mock-adapter'
import mockjs from 'mockjs'
import { Response } from './utils'

export const posts = (mock: MockAdapter) => {
  mock.onGet('/api/posts').reply(
    200,
    Response(
      mockjs.mock({
        'items|20': [
          {
            'id|+1': 1,
            title: '@ctitle',
            content: '@csentence'
          }
        ],
        total: 55
      })
    )
  )

  mock.onGet(/api\/posts\/\d+/).reply(
    200,
    Response(
      mockjs.mock({
        id: '1',
        title: '@ctitle',
        content: '@csentence'
      })
    )
  )
}
