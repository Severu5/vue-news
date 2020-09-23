<template>
  <div class='article_container'>
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />
    <div
      class="article-body"
      ref="article_detail"
    >
      <h2 class="title">{{article.title}}</h2>
      <van-cell
        center
        class="author"
      >
        <div
          slot="title"
          class="author__name"
        >{{article.aut_name}}</div>
        <van-image
          class="avatar"
          slot="icon"
          round
          fit="cover"
          :src="article.aut_photo"
        />
        <div
          slot="label"
          class="pubdate"
        >{{article.pubdate | relativeTime}}</div>
        <van-button
          :type="article.is_followed ? 'default' : 'info'"
          :icon="article.is_followed ? '' : 'plus'"
          :loading="isFollowLoading"
          @click="onFollow"
          round
          size="small"
        >{{article.is_followed ? '已关注' : '关注'}}
        </van-button>
      </van-cell>
      <div
        class="markdown-body"
        v-html="article.content"
        ref="article-content"
      >
      </div>
      <van-cell
        ref="comment-area-tip"
        title="全部评论"
        :border="false"
      />
      <commentList
        :source="articleId"
        :comment-list="commentListData"
        @update-total-count="totalCommentCount = $event"
        @reply-click="onReplyClick"
      />
    </div>
    <div class="article-footer">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
      >评论</van-button>
      <van-icon
        name="comment-o"
        color="#777"
        :info="totalCommentCount"
        @click="goToComment"
      />
      <van-icon
        :name="article.is_collected ? 'star' : 'star-o'"
        :color="article.is_collected ? 'orange' : '#777'"
        @click="onStar"
      />
      <van-icon
        :name="article.attitude === -1 ? 'good-job-o' : 'good-job'"
        :color="article.attitude === -1 ? '#777' : 'red'"
        @click="onLike"
      />
      <van-icon
        name="share"
        color="#777"
      />
    </div>

    <van-popup
      v-model="isPostShow"
      position="bottom"
    >
      <postComment
        :target="articleId"
        @post-success="onPostSuccess"
      />
    </van-popup>

    <van-popup
      v-model="isReplyShow"
      position="bottom"
    >
      <commentReply
        v-if="isReplyShow"
        :comment="replyComment"
        :articleId="articleId"
        @close-reply="isReplyShow = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { getArticle, followUser, unFollowUser, collectArticle, unCollectArticle, likeArticle, unLikeArticle } from '@/api/article'
import { ImagePreview } from 'vant'
import commentList from './components/comment-list'
import postComment from './components/post-comment'
import commentReply from './components/comment-reply'

export default {
  name: 'articleIndex',
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  created () {
    this.getArticle()
  },
  data () {
    return {
      article: {},
      isFollowLoading: false,
      isPostShow: false,
      commentListData: [],
      totalCommentCount: 0,
      isReplyShow: false,
      replyComment: {}
    }
  },
  methods: {
    async getArticle () {
      let params = {
        id: this.articleId
      }
      const { data } = await getArticle(params)
      this.article = { ...data }
      this.$nextTick(() => {
        this.handlePreviewImage()
      })
    },
    handlePreviewImage () {
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const imgPaths = []
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = function () {
          ImagePreview({
            images: imgPaths,
            startPosition: index,
          });
        }
      })
    },
    async onFollow () {
      this.isFollowLoading = true
      let params = {
        target: this.article.aut_id.toString()
      }
      if (this.article.is_followed) {
        await unFollowUser(params)
        this.$toast.success('取消关注成功')
      } else {
        await followUser(params)
        this.$toast.success('关注成功')
      }
      this.article.is_followed ^= true
      this.isFollowLoading = false
    },
    async onStar () {
      this.$toast.loading({
        message: '收藏中',
        forbidClick: true
      })
      let params = {
        target: this.article.art_id.toString()
      }
      if (this.article.is_collected) {
        await unCollectArticle(params)
        this.$toast.success('取消收藏成功')
      } else {
        await collectArticle(params)
        this.$toast.success('收藏成功')
      }
      this.article.is_collected ^= true
    },
    async onLike () {
      this.$toast.loading({
        forbidClick: true
      })
      let params = {
        target: this.article.art_id.toString()
      }
      if (this.article.attitude === -1) {
        await likeArticle(params)
        this.$toast.success('点赞成功')
        this.article.attitude = 1
      } else {
        await unLikeArticle(params)
        this.$toast.success('取消点赞成功')
        this.article.attitude = -1
      }
    },
    onPostSuccess (comment) {
      this.isPostShow = false
      this.totalCommentCount++
      this.commentListData.unshift(comment)
    },
    goToComment () {
      const dom = this.$refs['article_detail']
      const cdom = this.$refs['comment-area-tip']
      dom.scrollTo(0, cdom.offsetTop)
    },
    onReplyClick (comment) {
      this.isReplyShow = true
      this.replyComment = comment
    }
  },
  components: {
    commentList,
    postComment,
    commentReply
  }
}
</script>

<style>
@import url('~@/assets/styles/github-markdown.css');
</style>

<style lang="less" scoped>
.article_container {
  .article-body {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
    .title {
      margin: 0;
      padding: 14px;
      font-size: 20px;
      color: #3a3a3a;
      background-color: #fff;
    }
    .author {
      .avatar {
        width: 35px;
        height: 35px;
        margin-right: 8px;
      }
      .author__name {
        font-size: 12px;
        color: #333;
      }
      .pubdate {
        font-size: 12px;
        color: #b4b4b4;
      }
      .van-button {
        width: 85px;
        height: 29px;
      }
    }
    .markdown-body {
      padding: 14px;
      background-color: #fff;
      ul {
        list-style: unset;
      }
    }
  }
  .article-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 50px;
    padding: 10px;
    background-color: #fff;
    .comment-btn {
      width: 40%;
    }
    .van-icon {
      flex: 1;
      text-align: right;
    }
  }
}
</style>
