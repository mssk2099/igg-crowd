<template>
  <APopconfirm title="确认删除" @confirm="onConfirm">
    <a class="danger">删除</a>
  </APopconfirm>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { EditService } from '../../../core/crud'
import { showMessage } from '../../../core/message'

export default defineComponent({
  props: {
    service: {
      type: Object as () => EditService,
      required: true
    },
    data: {
      required: true
    }
  },
  setup(props) {
    const { service, data } = props

    async function onConfirm() {
      const hide = showMessage('正在删除', 'loading')
      await service.onRemove(data)
      hide()
      showMessage('删除成功')
    }

    return {
      onConfirm
    }
  }
})
</script>

<style scoped></style>
