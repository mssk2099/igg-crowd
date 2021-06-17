import MockAdapter from 'axios-mock-adapter'
import mockjs from 'mockjs'
import { EnableStatus } from '../typing'
import { TaskType } from '../views/sys/task-types/types'
import { PaginationResponse, Response } from './utils'

export const settingsModule = (mock: MockAdapter) => {
  mock
    .onGet('/settings/module')
    .reply(
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
    .onGet(/\/settings\/module\/\d+/)
    .reply(
      200,
      Response(
        mockjs.mock({
          module_id: 1,
          parent_id: 1,
          name: '01',
          status: EnableStatus.DISABLE
        } as TaskType)
      )
    )
}
