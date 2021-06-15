<template>
  <APopconfirm
    title="确认删除"
    ok-text="确认"
    cancel-text="取消"
    @confirm="onConfirm"
  >
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
    }
  },
  setup(props) {
    const { service } = props

    function onConfirm() {
      //TODO pass row data
      service.onRemove({})
    }

    return {
      onConfirm
    }
  }
})
</script>

<style scoped></style>
