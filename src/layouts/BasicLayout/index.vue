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

<script lang='ts'>
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

<style scoped lang='scss'>
.basic-layout {
  height: 100vh;
  overflow: hidden;
  display: flex;

  .aside {
    display: flex;
    flex-direction: column;
    flex: 0 0 200px;
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
    flex: 1;
    display: flex;
    flex-direction: column;
    
    .header {
      flex: 0 0 60px;
      display: flex;
      background-color: #999;

      .tabs {
        flex: 1;
      }
    }

    main {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
    }
  }
}
</style>