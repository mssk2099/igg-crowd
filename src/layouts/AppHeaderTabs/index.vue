<template>
  <div class="app-header-tabs-wrapper">
    <ol class="app-header-tabs">
      <template v-for="(tab, index) in tabs">
        <li
          :key="index"
          :class="{ active: tab === active }"
          @click="onClick(tab)"
        >
          <div class="title">
            {{ tab.route.meta.title }}
          </div>
          <div class="action">
            <button @click.prevent="onClose(index)">
              X
            </button>
          </div>
        </li>
      </template>
    </ol>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, toRef } from '@vue/composition-api'
import { AppTabItem } from '../../service/AppTabsService'

export default defineComponent({
  setup() {
    const appTabsService = inject('appTabsService')

    const tabs = toRef(appTabsService, 'tabs')

    const active = toRef(appTabsService, 'active')

    function onClick(tab: AppTabItem) {
      appTabsService.setActive(tab.path)
    }

    function onClose(index: number) {
      appTabsService.closeByIndex(index)
    }

    return {
      tabs,
      active,
      onClick,
      onClose
    }
  }
})
</script>

<style scoped lang="scss">
.app-header-tabs-wrapper {
  padding: 0 20px;
}

.app-header-tabs {
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0 -8px;
  padding: 0;

  li {
    display: flex;
    align-items: center;
    padding: 0 8px;
    margin: 0 8px;
    background-color: #fff;

    &.active {
      background-color: #ff5e5e;
    }
  }
}
</style>
