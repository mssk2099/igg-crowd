<template>
  <Page>
    <PageActionBar>
      <AButton @click="edit.onAdd()">
        添加父级
      </AButton>
    </PageActionBar>

    <CoreTable
      :service="list"
      :data-source="dataSource"
      :table-props="{
        rowKey: 'module_id',
        columns: [
          {
            title: '制作内容',
            dataIndex: 'name'
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
        <a @click="edit.onAdd(record)">添加子级</a>
        <a @click="edit.onEdit(record)">编辑</a>
        <RemoveConfirm :service="edit" :data="record">
          删除
        </RemoveConfirm>
      </ASpace>
    </CoreTable>

    <Edit />
  </Page>
</template>

<script lang="ts">
import { computed, defineComponent, provide } from '@vue/composition-api'
import { toTree } from '../../../utils/tree'
import Edit from './edit.vue'
import { Store } from './store'

export default defineComponent({
  components: { Edit },
  setup() {
    const store = new Store()
    provide('store', store)

    store.list.fetch()

    const dataSource = computed(() =>
      toTree<>(store.list.items, {
        key: 'module_id',
        parentKey: 'parent_id'
      })
    )

    return {
      store,
      list: store.list,
      edit: store.edit,
      dataSource
    }
  }
})
</script>

<style scoped></style>
