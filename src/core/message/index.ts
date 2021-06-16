import { message } from 'ant-design-vue'

export const defaultErrorHandler = (e: Error) => {
  if ((e as any)._handle) {
    return
  }
  return showMessage(e.message || '服务繁忙')
}

export const showMessage = (
  content: string,
  type: 'success' | 'info' | 'warn' | 'error' | 'loading' = 'success'
) => {
  if (typeof message[type] !== 'function') {
    throw new Error(`showMessage type undefined ${type}`)
  }
  return message[type]({
    content
  })
}
