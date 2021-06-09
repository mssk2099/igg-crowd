<template>
  <div id="app">
    <ConfigProvider :locale="locale">
      <router-view />
    </ConfigProvider>
  </div>
</template>

<script lang="ts">
import { ConfigProvider } from 'ant-design-vue'

export default {
  components: {
    ConfigProvider
  },
  setup() {
    return {
      locale: require('ant-design-vue/lib/locale-provider/zh_CN')
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/app.scss';
</style>
