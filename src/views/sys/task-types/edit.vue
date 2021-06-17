<template>
  <EditDialog
    :service="edit"
    :form-props="{
      rules
    }"
  >
    <AFormModelItem label="制作内容" prop="name">
      <AInput v-model="edit.data.name" />
    </AFormModelItem>

    <AFormModelItem label="状态" prop="status">
      <ARadioGroup v-model="edit.data.status">
        <ARadio :value="1">
          正常
        </ARadio>
        <ARadio :value="0">
          禁用
        </ARadio>
      </ARadioGroup>
    </AFormModelItem>

    <AFormModelItem label="封面">
      <ImageUpload v-model="edit.data.cover" />
    </AFormModelItem>
  </EditDialog>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from '@vue/composition-api'
import { Store } from './store'

export default defineComponent({
  setup() {
    const store = inject<Store>('store')

    const rules = ref({
      name: [{ required: true, message: '请填写' }],
      status: [{ required: true, message: '请填写' }]
    })

    return {
      edit: store?.edit,
      rules
    }
  }
})
</script>

<style scoped></style>
