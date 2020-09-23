<template>
  <div class='update-birth__container'>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
      @cancel="$emit('close-edit')"
    />
  </div>
</template>

<script>
import { updateUser } from '@/api/user'
import { formatDate } from '@/utils/dayjs'
export default {
  name: 'update-birth',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1920, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onConfirm (value) {
      value = formatDate(value)
      this.$toast.loading({
        message: '保存中',
        forbidClick: true
      })
      let params = {
        birthday: value
      }
      await updateUser(params)
      this.$emit('input', value)
      this.$emit('close-edit')
      this.$toast.success('修改成功')
    }
  }
}
</script>
