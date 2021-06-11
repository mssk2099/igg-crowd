<template>
  <AMenu mode="inline">
    <template v-for="group in menu">
      <SubMenu :key="group.path">
        <span slot="title">{{ group.meta.title }}</span>
        <template v-for="item in group.children">
          <Item :key="`${group.path}/${item.path}`">
            {{ item.meta.title }}
          </Item>
        </template>
      </SubMenu>
    </template>
  </AMenu>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { Menu } from 'ant-design-vue'
import { dynamicRoutes } from '../../router/config'
import { createMenuConfig } from '../../router/menu'

const { SubMenu, Item } = Menu

export default defineComponent({
  components: {
    AMenu: Menu,
    SubMenu,
    Item
  },
  setup() {
    return {
      menu: createMenuConfig(dynamicRoutes)
    }
  }
})
</script>

<style scoped></style>
