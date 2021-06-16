<template>
  <APopconfirm title="确认删除" @confirm="onConfirm">
    <a class="danger">删除</a>
  </APopconfirm>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { EditService } from '../../../core/crud'

export default defineComponent({
  props: {
    service: {
      type: Object as () => EditService<unknown>
    },
    data: {
      required: true
    }
  },
  setup(props) {
    const { service } = props

    function onConfirm() {
      service.onRemove(this.data)
    }

    return {
      onConfirm
    }
  }
})
</script>

<style scoped></style>
