import { getCurrentInstance } from '@vue/composition-api'

export function useRouter() {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('must be called in setup')
  return vm.proxy.$router
}
