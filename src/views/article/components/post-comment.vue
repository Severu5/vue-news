<template>
  <div class='post-comment__container'>
    <van-field
      v-model.trim="content"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入评论"
      show-word-limit
    >
      <template #button>
        <van-button
          size="small"
          type="primary"
          :disabled="!content"
          @click="onPost"
        >发布</van-button>
      </template>
    </van-field>
  </div>
</template>

<script>
import { postComment } from '@/api/article'
export default {
  name: 'post-comment',
  props: {
    target: {
      type: [String, Number, Object],
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      default: null
    },
    replyTo: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      content: ''
    }
  },
  methods: {
    async onPost () {
      this.$toast.loading({
        message: '发布中',
        forbidClick: true
      })
      const replyTo = this.replyTo
      let content = this.content
      if (replyTo) {
        content += `//@${replyTo.aut_name}: ${replyTo.content}`
      }
      let params = {
        target: this.target.toString(),
        content
      }
      if (this.articleId) params.art_id = this.articleId.toString()
      const { data } = await postComment(params)
      this.content = ''
      data.new_obj.is_liking = false
      this.$emit('post-success', data.new_obj)
      this.$toast.success('发布成功')
    }
  }
}
</script>
