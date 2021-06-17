<template>
  <div class="edit-form">
    <ASpin :spinning="service.loading">
      <AFormModel
        ref="formRef"
        v-bind="{
          model: service.data,
          labelCol,
          wrapperCol,
          ...formProps
        }"
      >
        <slot />
      </AFormModel>
    </ASpin>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api'
import { FormModel } from 'ant-design-vue'
import { EditService } from '../../../core/crud'

export default defineComponent({
  props: {
    service: {
      type: Object as () => EditService,
      required: true
    },
    formProps: {
      type: Object as () => FormModel
    },
    labelSpan: {
      type: Number as () => number,
      default: 4
    }
  },
  setup(props) {
    const formRef = ref<FormModel>()

    watch(
      () => formRef.value,
      () => {
        props.service.validator = () => {
          if (formRef.value) {
            return formRef.value.validate()
          }
          return Promise.reject()
        }
      },
      {
        flush: 'post'
      }
    )

    const labelCol = ref({ span: props.labelSpan })
    const wrapperCol = ref({ span: 24 - props.labelSpan - 2 })

    return {
      formRef,
      labelCol,
      wrapperCol
    }
  }
})
</script>

<style scoped></style>
