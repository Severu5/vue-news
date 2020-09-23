<template>
  <div class='update-name__container'>
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close-edit')"
      @click-right="onConfirm"
    />
    <div class="input-wrap">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUser } from '@/api/user'
export default {
  name: 'update-name',
  model: {

  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true
      })
      let params = {
        name: this.localName
      }
      try {
        await updateUser(params)
        this.$emit('input', this.localName)
        this.$emit('close-edit')
        this.$toast.success('修改成功')
      } catch (err) {
        if (err && err.response && err.response.status === 409) {
          this.$toast.fail('昵称已存在')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.update-name__container {
  .input-wrap {
    padding: 10px;
  }
}
</style>
