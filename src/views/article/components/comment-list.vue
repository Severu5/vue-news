<template>
  <div class='comment-list__container'>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item
        v-for="(comment, index) in commentList"
        :key="index"
        :comment="comment"
        @reply-click="$emit('reply-click', $event)"
      />
    </van-list>
  </div>
</template>

<script>
import { getComment } from '@/api/article'
import commentItem from './comment-item'
export default {
  name: 'comment-list',
  props: {
    source: {
      type: [String, Number, Object],
      required: true
    },
    type: {
      type: String,
      default: 'a'
    },
    commentList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    };
  },
  methods: {
    async onLoad () {
      let params = {
        type: this.type,
        source: this.source.toString(),
        limit: this.limit
      }
      if (this.offset) params.offset = this.offset.toString()
      const { data } = await getComment(params)
      const { results } = data
      this.loading = false
      if (results.length) {
        this.offset = data.last_id
      } else {
        this.finished = true
      }
      this.commentList.push(...results)
      this.$emit('update-total-count', data.total_count)
    }
  },
  components: {
    commentItem
  }
}
</script>

