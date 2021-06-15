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

    <CoreTable
      :service="list"
      :table-props="{
        columns: [
          {
            title: 'Title',
            dataIndex: 'title'
          },
          {
            title: '操作',
            key: 'actions',
            scopedSlots: { customRender: 'actions' }
          }
        ]
      }"
    >
      <ASpace slot="actions" slot-scope="_, record">
        <a>编辑</a>
        <RemoveConfirm :service="edit" :data="record">
          删除
        </RemoveConfirm>
      </ASpace>
    </CoreTable>
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
      list: store.list,
      edit: store.edit
    }
  }
})
</script>

<style scoped></style>
