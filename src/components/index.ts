import Vue from 'vue'
import Page from './containers/Page/index.vue'
import PageActionBar from './containers/PageActionBar/index.vue'
import { SearchForm } from './core/SearchForm'

const components = { Page, PageActionBar, SearchForm }

export const registerRootComponents = () => {
  Object.keys(components).forEach(name => {
    // @ts-ignore
    Vue.component(name, components[name])
  })
}
