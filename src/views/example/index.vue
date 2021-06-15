<template>
  <Page>
    <PageActionBar>
      <AButton>添加</AButton>
    </PageActionBar>
    <SearchForm :service="list">
      <a-form-model-item label="Title" prop="title">
        <a-input v-model="list.search.title" />
      </a-form-model-item>
    </SearchForm>
  </Page>
</template>

<script lang="ts">
import { defineComponent, provide } from '@vue/composition-api'
import { Store } from './store'

export default defineComponent({
  setup() {
    const store = new Store()
    provide('store', store)

    store.list.fetch()

    return {
      store,
      list: store.list
    }
  }
})
</script>

<style scoped></style>
