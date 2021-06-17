<template>
  <div>TaskTypeSelect - {{ value }}</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    value: {
      type: Number as () => number,
      required: true
    }
  }
})
</script>

<style scoped></style>
