<template>
  <div class='comment-reply__container'>
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon
        slot="left"
        name="cross"
        @click="$emit('close-reply')"
      />
    </van-nav-bar>
    <commentItem :comment="comment" />

    <van-cell title="全部回复" />
    <commentList
      :comment-list="commentListData"
      :source="comment.com_id"
      @reply-click="onReplyClick"
      type="c"
    />

    <div class="article-footer">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="onPostClick"
      >评论</van-button>
    </div>
    <van-popup
      v-model="isPostShow"
      position="bottom"
    >
      <postComment
        :target="target"
        :reply-to="replyTo"
        :articleId="articleId"
        @post-success="onPostSuccess"
      />
    </van-popup>
  </div>
</template>

<script>
import commentItem from './comment-item'
import commentList from './comment-list'
import postComment from './post-comment'
export default {
  name: 'comment-reply',
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    },
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isPostShow: false,
      commentListData: [],
      target: this.comment.com_id,
      replyTo: null
    }
  },
  methods: {
    onPostSuccess (comment) {
      this.isPostShow = false
      this.commentListData.unshift(comment)
      this.comment.reply_count++
    },
    onPostClick () {
      this.target = this.comment.com_id
      this.replyTo = null
      this.isPostShow = true
    },
    onReplyClick (comment) {
      this.target = comment.com_id
      this.replyTo = comment
      this.isPostShow = true
    }
  },
  components: {
    commentItem,
    commentList,
    postComment
  }
}
</script>

<style lang="less" scoped>
.comment-reply__container {
  .article-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    height: 50px;
    padding: 10px;
    background-color: #fff;
    .comment-btn {
      width: 80%;
    }
  }
}
</style>
