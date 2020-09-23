<template>
  <van-cell class='comment-item__container'>
    <van-image
      class="avatar"
      slot="icon"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title">
      <div class="title-wrap">
        <div class="name">{{comment.aut_name}}</div>
        <div
          class="like-wrap"
          @click="onLike"
        >
          <van-icon
            class="like"
            :class="{liked: comment.is_liking}"
            :name="comment.is_liking ? 'good-job' : 'good-job-o'"
          />
          <span class="like-count">{{comment.like_count}}</span>
        </div>
      </div>
      <div class="content">{{comment.content}}</div>
      <div>
        <span class="pubdate">{{comment.pubdate | dateTime('MM-DD HH:mm')}}</span>
        <van-button
          class="reply-btn"
          size="mini"
          round
          @click="$emit('reply-click', comment)"
        >{{comment.reply_count}} 回复</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { likeComment, unLikeComment } from '@/api/article'

export default {
  name: 'comment-item',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    async onLike () {
      this.$toast.loading({
        forbidClick: true
      })
      let params = {
        target: this.comment.com_id.toString()
      }
      if (this.comment.is_liking) {
        await unLikeComment(params)
        this.comment.is_liking ^= true
        this.comment.like_count--
        this.$toast.success('取消点赞成功')
      } else {
        await likeComment(params)
        this.comment.is_liking ^= true
        this.comment.like_count++
        this.$toast.success('点赞成功')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment-item__container {
  .avatar {
    width: 36px;
    height: 36px;
    margin-right: 13px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    .name {
      font-size: 14px;
      color: #406590;
    }
    .like-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      .liked {
        color: red;
      }
    }
  }

  .content {
    font-size: 16px;
    color: #222;
  }
  .pubdate {
    font-size: 11px;
  }
}
</style>
