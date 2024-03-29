import Vue from 'vue'
import App from './App.vue'
import { initAxiosMock } from './mock'
import { router } from './router'
import VueCompositionAPI from '@vue/composition-api'
import './imports'

Vue.use(VueCompositionAPI)

Vue.config.productionTip = false

initAxiosMock()

localStorage.setItem('debug', ['service:*'].join(','))

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
