<template>
  <AMenu mode="inline" @click="onClick">
    <template v-for="group in menu">
      <SubMenu :key="group.path">
        <span slot="title">{{ group.meta.title }}</span>
        <template v-for="item in group.children">
          <Item :key="item.meta.fullPath">
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
import { useRouter } from '../../use/useRouter'

const { SubMenu, Item } = Menu

export default defineComponent({
  components: {
    AMenu: Menu,
    SubMenu,
    Item
  },
  setup() {
    const router = useRouter()

    function onClick({ key }: { key: string }) {
      router.push(key)
    }

    return {
      menu: createMenuConfig(dynamicRoutes),
      onClick
    }
  }
})
</script>

<style scoped></style>
