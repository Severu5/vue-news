<template>
  <van-cell
    class="article-item"
    :to="{ name: 'article', params: { articleId: article.art_id}}"
  >
    <div
      slot="title"
      class="title van-multi-ellipsis--l3"
    >{{article.title}}</div>
    <div slot="label">
      <div
        class="cover-wrap"
        v-if="article.cover.type === 3"
      >
        <van-image
          class="cover-wrap-item"
          fit="cover"
          v-for="(img, index) in article.cover.images"
          :key="index"
          :src="img"
        />
      </div>
      <div class="label-wrap">
        <span>{{article.aut_name}}</span>
        <span>{{article.comm_count}}评论</span>
        <span>{{article.pubdate | relativeTime}}</span>
      </div>
    </div>
    <van-image
      v-if="article.cover.type === 1"
      fit="cover"
      class="right-cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>
<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="less" scoped>
.article-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    margin-left: 10px;
  }
  .right-cover {
    width: 116px;
    height: 73px;
  }
  .cover-wrap {
    display: flex;
    flex-wrap: nowrap;
    padding: 15px 0;
    .cover-wrap-item {
      flex: 1;
      &:not(:last-child) {
        padding-right: 4px;
      }
      /deep/ img {
        width: 100%;
        height: 73px;
      }
    }
  }
  .label-wrap {
    font-size: 11px;
    color: #b4b4b4;
    span {
      margin-right: 12px;
    }
  }
}
</style>