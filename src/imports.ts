import {
  Button,
  FormModel,
  Input,
  Popconfirm,
  Space,
  Table
} from 'ant-design-vue'
import Vue from 'vue'
import { registerRootComponents } from './components'

function registerAntComponents() {
  Vue.component(Button.name, Button)
  Vue.component(Input.name, Input)
  Vue.component(Table.name, Table)
  Vue.component(Popconfirm.name, Popconfirm)
  Vue.component(Space.name, Space)

  Vue.use(FormModel)
}

registerAntComponents()

registerRootComponents()
