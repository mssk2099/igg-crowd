import { Button, FormModel } from 'ant-design-vue'
import Vue from 'vue'
import { ListService } from '../../../core/crud'

export const SearchForm = Vue.extend({
  props: {
    service: {
      type: Object as () => ListService<any, any, any>,
      required: true
    },
    formProps: {
      type: Object as () => FormModel,
      default: null
    }
  },
  mounted() {
    const form = this.$refs.form as FormModel
    this.service.searchValidator = () => form.validate()
  },
  render() {
    return (
      <FormModel
        {...{
          ref: 'form',
          props: { ...this.formProps, model: this.service.search }
        }}
      >
        {this.$slots.default}

        <FormModel.Item>
          <Button
            {...{
              props: {
                type: 'primary'
              },
              on: {
                click: () => this.service.handlerSearchSubmit()
              }
            }}
          >
            查询
          </Button>
          <Button
            {...{
              props: {},
              on: {
                click: () => this.service.handlerSearchReset()
              }
            }}
          >
            重置
          </Button>
        </FormModel.Item>
      </FormModel>
    )
  }
})
