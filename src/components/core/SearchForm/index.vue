<template>
  <div class="search-form">
    <AFormModel
      ref="formRef"
      v-bind="{
        ...formProps,
        model: service.search,
        layout: 'inline'
      }"
    >
      <slot />

      <AFormModelItem>
        <ASpace>
          <AButton type="primary" @click="service.handlerSearchSubmit()">
            查询
          </AButton>
          <AButton @click="service.handlerSearchReset()">
            重置
          </AButton>
        </ASpace>
      </AFormModelItem>
    </AFormModel>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api'
import { FormModel } from 'ant-design-vue'
import { ListService } from '../../../core/crud'

export default defineComponent({
  props: {
    service: {
      type: Object as () => ListService<unknown>,
      required: true
    },
    formProps: {
      type: Object as () => FormModel,
      default: null
    }
  },
  setup(props) {
    const formRef = ref<FormModel>()

    onMounted(() => {
      props.service.searchValidator = () => formRef.value?.validate()
    })

    return {
      formRef
    }
  }
})
</script>

<style scoped></style>
