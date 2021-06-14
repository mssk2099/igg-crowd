import { message } from 'ant-design-vue'

export const defaultErrorHandler = (e: Error) => {
  if ((e as any)._handle) {
    return
  }
  return showMessage(e.message)
}

export const showMessage = (
  content: string,
  type: 'success' | 'info' | 'warn' | 'error' = 'success'
) => {
  if (typeof message[type] !== 'function') {
    return
  }
  message[type]({
    content
  })
}
