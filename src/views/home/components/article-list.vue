<template>
  <div class="article_list">
    <van-pull-refresh
      v-model="isPullDownLoading"
      :success-text="refreshSuccessText"
      :success-duration="1000"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="article in articleList"
          :key="article.art_id"
          :article="article"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getArticle } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      articleList: [],
      loading: false,
      finished: false,
      timestamp: null,
      refreshSuccessText: '',
      isPullDownLoading: false
    }
  },
  methods: {
    async onLoad () {
      let params = {
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      }
      const { data } = await getArticle(params)
      const { results } = data
      this.articleList.push(...results)
      this.loading = false
      if (results.length) {
        this.timestamp = data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    async onRefresh () {
      let params = {
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      }
      const { data } = await getArticle(params)
      const { results } = data
      this.articleList.unshift(...results)
      this.refreshSuccessText = `更新了${results.length}条数据`
      this.isPullDownLoading = false
    }
  },
  components: {
    ArticleItem
  }
}
</script>
<style lang="less" scoped>
.article_list {
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  overflow-y: auto;
}
</style>