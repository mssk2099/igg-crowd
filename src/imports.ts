import {
  Button,
  FormModel,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table
} from 'ant-design-vue'
import Vue from 'vue'
import { registerRootComponents } from './components'

function registerAntComponents() {
  Vue.use(FormModel)

  Vue.component(Button.name, Button)
  Vue.component(Input.name, Input)
  Vue.component(Modal.name, Modal)
  Vue.component(Popconfirm.name, Popconfirm)
  Vue.component(Space.name, Space)
  Vue.component(Table.name, Table)
}

registerAntComponents()

registerRootComponents()
