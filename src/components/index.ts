import Vue from 'vue'
import Page from './containers/Page/index.vue'
import PageActionBar from './containers/PageActionBar/index.vue'
import SearchForm from './core/SearchForm/index.vue'
import CoreTable from './core/Table/index.vue'
import RemoveConfirm from './core/RemoveConfirm/index.vue'

const components = { Page, PageActionBar, SearchForm, CoreTable, RemoveConfirm }

export const registerRootComponents = () => {
  Object.keys(components).forEach(name => {
    // @ts-ignore
    Vue.component(name, components[name])
  })
}
