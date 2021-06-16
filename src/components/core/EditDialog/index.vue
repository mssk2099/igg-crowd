<script lang="tsx">
import { computed, defineComponent } from '@vue/composition-api'
import { Modal as AModal } from 'ant-design-vue'
import { EditService } from '../../../core/crud'

export default defineComponent({
  props: {
    service: {
      type: Object as () => EditService<unknown>
    },
    modalProps: {
      type: Object as () => AModal
    }
  },
  setup(props) {
    const { service } = props

    const title = computed(() => (service.isEdit ? '编辑' : '添加'))

    return {
      title
    }
  },
  render() {
    const { service, title, modalProps } = this
    return (
      <AModal
        vModel={service.visible}
        {...{
          props: {
            title,
            confirmLoading: service.saving,
            width: 600,
            destroyOnClose: true,
            ...modalProps
          },
          on: {
            ok: () => service.onEditSubmit(),
            cancel: () => service.onCancel()
          }
        }}
      >
        A
      </AModal>
    )
  }
})
</script>

<style scoped></style>
