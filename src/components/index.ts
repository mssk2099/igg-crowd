import Vue from 'vue'
import Page from './containers/Page/index.vue'
import PageActionBar from './containers/PageActionBar/index.vue'
import EditDialog from './core/EditDialog/index.vue'
import EditForm from './core/EditForm/index.vue'
import RemoveConfirm from './core/RemoveConfirm/index.vue'
import SearchForm from './core/SearchForm/index.vue'
import CoreTable from './core/Table/index.vue'

const components = {
  Page,
  PageActionBar,
  SearchForm,
  CoreTable,
  RemoveConfirm,
  EditDialog,
  EditForm
}

export const registerRootComponents = () => {
  Object.keys(components).forEach(name => {
    // @ts-ignore
    Vue.component(name, components[name])
  })
}
