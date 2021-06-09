<template>
  <div class="basic-layout">
    <div class="aside">
      <div class="logo-container">
        logo
      </div>
      <AppMenu class="menu" />
    </div>

    <div class="main">
      <div class="header">
        <AppHeaderTabs class="tabs" />
        <div class="notice-container" />
        <div class="header-right">
          <div class="user" />
          <div class="message" />
          <div class="more" />
        </div>
      </div>
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import AppHeaderTabs from '../AppHeaderTabs/index.vue'
import AppMenu from '../AppMenu/index.vue'

export default {
  name: 'BasicLayout',
  components: {
    AppHeaderTabs,
    AppMenu
  }
}
</script>

<style scoped lang="scss">
.basic-layout {
  display: flex;
  overflow: hidden;
  height: 100vh;

  .aside {
    display: flex;
    flex: 0 0 200px;
    flex-direction: column;
    background-color: palevioletred;

    .logo-container {
      flex: 0 0 60px;
      background-color: #555;
    }

    .menu {
      flex: 1;
    }
  }

  .main {
    display: flex;
    flex: 1;
    flex-direction: column;

    .header {
      display: flex;
      flex: 0 0 60px;
      background-color: #999;

      .tabs {
        flex: 1;
      }
    }

    main {
      min-height: 0;
      flex: 1;
      overflow-y: auto;
    }
  }
}
</style>
