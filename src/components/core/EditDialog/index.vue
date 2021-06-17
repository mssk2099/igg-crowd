<script lang="tsx">
import { computed, defineComponent } from '@vue/composition-api'
import { FormModel, Modal as AModal } from 'ant-design-vue'
import { EditService } from '../../../core/crud'
import EditForm from '../EditForm/index.vue'

export default defineComponent({
  props: {
    service: {
      type: Object as () => EditService,
      required: true
    },
    modalProps: {
      type: Object as () => AModal
    },
    formProps: {
      type: Object as () => FormModel
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
    const { service, title, modalProps, formProps, $slots, $scopedSlots } = this
    return (
      <AModal
        {...{
          props: {
            visible: service.visible,
            title,
            width: 600,
            destroyOnClose: true,
            confirmLoading: service.saving,
            okButtonProps: {
              props: {
                disabled: service.loading
              }
            },
            ...modalProps
          },
          on: {
            ok: () => service.onEditSubmit(),
            cancel: () => service.onCancel()
          }
        }}
      >
        <EditForm
          {...{
            props: {
              service,
              formProps
            } as any,
            slots: $slots,
            scopedSlots: $scopedSlots
          }}
        />
      </AModal>
    )
  }
})
</script>

<style scoped></style>
