<template>
  <EditDialog :service="edit">
    <AFormModelItem label="标题">
      <AInput v-model="edit.data.title" />
    </AFormModelItem>
    <AFormModelItem label="内容">
      <ATextarea v-model="edit.data.content" />
    </AFormModelItem>
  </EditDialog>
</template>

<script lang="ts">
import { defineComponent, inject } from '@vue/composition-api'
import { Store } from './store'

export default defineComponent({
  setup() {
    const store = inject<Store>('store')

    return {
      edit: store?.edit
    }
  }
})
</script>

<style scoped></style>
