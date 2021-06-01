import storage from 'store'
import { getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
const user = {
  state: {
    info: {}
  },

  mutations: {
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const result = response.result

          commit('SET_INFO', result)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          storage.remove(ACCESS_TOKEN)
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
        })
      })
    }

  }
}

export default user
