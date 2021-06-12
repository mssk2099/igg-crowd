<template>
  <div class="home">
    <input type="text" value="home">
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Home',
  setup() {
    //
  }
})
</script>

<style scoped>
.home {
  height: 200vh;
}
</style>
