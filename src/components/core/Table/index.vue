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

    const pagination = computed<Pagination>(() => ({
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
    return (
      <ATable
        dataSource={this.service.items}
        rowKey={row => row.id}
        pagination={this.pagination}
        loading={this.service.loading}
        {...{
          props: this.tableProps,
          on: {
            change: this.onChange
          }
        }}
      >
        {Object.keys(this.$slots).map(name => (
          <template slot={name}>{this.$slots[name]}</template>
        ))}
      </ATable>
    )
  }
})
</script>

<style scoped></style>

<!--
:data-source="service.items"
:row-key="row => row.id"
:pagination="pagination"
:loading="service.loading"
v-bind="tableProps"
@change="onChange"-->
