import {
  Button,
  FormModel,
  Input,
  Modal,
  Popconfirm,
  Space,
  Spin,
  Table
} from 'ant-design-vue'
import Vue from 'vue'
import { registerRootComponents } from './components'

function registerAntComponents() {
  Vue.use(FormModel)
  Vue.use(Input)

  Vue.component(Button.name, Button)
  Vue.component(Modal.name, Modal)
  Vue.component(Popconfirm.name, Popconfirm)
  Vue.component(Space.name, Space)
  Vue.component(Spin.name, Spin)
  Vue.component(Table.name, Table)
}

registerAntComponents()

registerRootComponents()
