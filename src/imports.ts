import { Button, FormModel, Input } from 'ant-design-vue'
import Vue from 'vue'
import { registerRootComponents } from './components'

function registerAntComponents() {
  Vue.component(Button.name, Button)
  Vue.component(Input.name, Input)

  Vue.use(FormModel)
}

registerAntComponents()

registerRootComponents()
