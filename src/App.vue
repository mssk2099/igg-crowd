<template>
  <div id="app">
    <ConfigProvider :locale="locale">
      <router-view />
    </ConfigProvider>
  </div>
</template>

<script lang="ts">
import { provide } from '@vue/composition-api'
import { ConfigProvider } from 'ant-design-vue'
import { appTabsService } from './service/AppTabsService'

export default {
  components: {
    ConfigProvider
  },
  setup() {
    provide('appTabsService', appTabsService)

    return {
      locale: require('ant-design-vue/lib/locale-provider/zh_CN'),
      appTabsService
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/app.scss';
</style>
