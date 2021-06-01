import request from '@/utils/request'

const api = {
  permissionNoPager: '/permission/no-pager'
}

export default api

export function getPermissions (parameter) {
  return request({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  })
}
