<template>
  <div class='update-gender__container'>
    <van-picker
      :default-index="value"
      title="性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import { updateUser } from '@/api/user'
export default {
  name: 'update-gender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女']
    }
  },
  methods: {
    async onConfirm (value, index) {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true
      })
      let params = {
        gender: +index
      }
      await updateUser(params)
      this.$emit('input', index)
      this.$emit('close-edit')
      this.$toast.success('修改成功')
    },
    onCancel () {
      this.$emit('close-edit')
    }
  }
}
</script>
