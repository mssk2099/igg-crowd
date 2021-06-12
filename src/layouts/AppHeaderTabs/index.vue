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
          <button
            v-if="!tab.pin"
            class="btn-close"
            type="button"
            @click.prevent="onClose(index)"
          >
            X
          </button>
        </li>
      </template>
    </ol>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef } from '@vue/composition-api'
import { AppTabItem, appTabsService } from '../../service/AppTabsService'

export default defineComponent({
  setup() {
    const tabs = toRef(appTabsService, 'tabs')

    const active = toRef(appTabsService, 'active')

    function onClick(tab: AppTabItem) {
      appTabsService.activeTabAndNavigate(tab.path)
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
    margin: 0 8px;
    background-color: #fff;
    cursor: pointer;

    .title {
      padding: 0 12px;
    }

    .btn-close {
      background-color: #eee;
      border: none;
      cursor: pointer;
    }

    &.active {
      background-color: #ff5e5e;
    }
  }
}
</style>
