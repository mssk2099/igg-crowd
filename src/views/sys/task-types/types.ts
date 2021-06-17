import { EnableStatus } from '../../../typing'

export type TaskType = {
  module_id: number
  parent_id: number
  name: string
  create_time: number
  status: EnableStatus
  children?: TaskType[]
}
