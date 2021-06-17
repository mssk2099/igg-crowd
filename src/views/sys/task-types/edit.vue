<template>
  <EditDialog
    :service="edit"
    :form-props="{
      rules
    }"
  >
    <template v-if="!isParent">
      <AFormModelItem label="父级" prop="parent_id">
        <TaskTypeSelect v-model="edit.data.parent_id" />
      </AFormModelItem>
    </template>

    <AFormModelItem label="制作内容" prop="name">
      <AInput v-model="edit.data.name" :disabled="edit.isEdit" />
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

    <template v-if="isParent">
      <AFormModelItem label="封面">
        <ImageUpload v-model="edit.data.cover" />
      </AFormModelItem>
    </template>
  </EditDialog>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref } from '@vue/composition-api'
import { Store } from './store'

export default defineComponent({
  setup() {
    const store = inject<Store>('store')
    const edit = store?.edit

    const isParent = computed(() => edit?.data?.parent_id === 0)

    const rules = ref({
      name: [{ required: true, message: '请填写' }],
      status: [{ required: true, message: '请填写' }]
    })

    return {
      edit,
      isParent,
      rules
    }
  }
})
</script>

<style scoped></style>
