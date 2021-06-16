<script lang="tsx">
import { computed, defineComponent } from '@vue/composition-api'
import { Pagination } from 'ant-design-vue'
import { Table as ATable } from 'ant-design-vue'
import { ListService } from '../../../core/crud'

export default defineComponent({
  name: 'CoreTable',
  props: {
    service: {
      type: Object as () => ListService<unknown>,
      required: true
    },
    tableProps: {
      type: Object as () => ATable,
      default: null
    }
  },
  setup(props) {
    const { service } = props

    const pagination = computed<Partial<Pagination>>(() => ({
      current: service.page,
      total: service.total,
      pageSize: service.size,
      showQuickJumper: true,
      // showSizeChanger: true,
      showTotal: total => `共 ${total} 条`
    }))

    function onChange({ current }) {
      service.handlePageIndexChange(current)
    }

    return {
      pagination,
      onChange
    }
  },
  render() {
    const {
      service,
      pagination,
      tableProps,
      onChange,
      $slots,
      $scopedSlots
    } = this
    return (
      <ATable
        {...{
          props: {
            dataSource: service.items,
            rowKey: row => row.id,
            pagination,
            loading: service.loading,
            ...(tableProps as any)
          },
          on: {
            change: onChange
          },
          slots: $slots,
          scopedSlots: $scopedSlots
        }}
      />
    )
  }
})
</script>

<style scoped></style>
