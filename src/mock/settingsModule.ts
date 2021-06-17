import MockAdapter from 'axios-mock-adapter'
import mockjs from 'mockjs'
import { TaskType } from '../views/sys/task-types/types'
import { PaginationResponse } from './utils'

export const settingsModule = (mock: MockAdapter) => {
  mock.onGet('/settings/module').reply(
    200,
    PaginationResponse([
      mockjs.mock({
        module_id: 1,
        parent_id: 0,
        name: '01'
      } as TaskType),
      mockjs.mock({
        module_id: 2,
        parent_id: 0,
        name: '02'
      } as TaskType),
      mockjs.mock({
        module_id: 11,
        parent_id: 1,
        name: '01-01'
      } as TaskType)
    ])
  )
}
