import axios from 'axios'
import { API_BASE } from '../../config'

export type Response<T> = {
  code: number
  data: T
  message: string
}

export const GlobalRequestHandlers = {
  onError: (e: Error) => console.error('request error:', e),
  onException: (e: Response<unknown>) => console.error('request exception', e)
}

const request = axios.create({
  baseURL: API_BASE,
  timeout: 15_000
})

request.interceptors.response.use(
  response => {
    const { data, error } = response.data
    if (error?.code > 0) {
      if (typeof GlobalRequestHandlers.onException === 'function') {
        GlobalRequestHandlers.onException(error)
      }
      return Promise.reject({ ...error, _handle: true })
    }
    return data
  },
  error => {
    if (typeof GlobalRequestHandlers.onError === 'function') {
      GlobalRequestHandlers.onError(error)
    }
    return Promise.reject({ ...error, _handle: true })
  }
)

export { request }
