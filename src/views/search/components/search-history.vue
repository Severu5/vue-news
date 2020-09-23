<template>
  <div class='search-history_container'>
    <van-cell title="搜索历史">
      <div
        class="operate"
        v-if="isDeleteShow"
      >
        <span @click="deleteAll">全部删除</span>
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon
        v-else
        name="delete"
        @click="isDeleteShow = true"
      />
    </van-cell>
    <van-cell
      v-for="(history, index) in searchHistoryList"
      :key="index"
      :title="history"
      @click="onDelete(history, index)"
    >
      <van-icon
        v-show="isDeleteShow"
        name="close"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'search-history',
  props: {
    searchHistoryList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  methods: {
    onDelete (history, index) {
      if (this.isDeleteShow) {
        this.$emit('delete-history', index)
      } else {
        this.$emit('update-search', history)
      }
    },
    deleteAll () {
      this.$emit('delete-all')
    }
  }
}
</script>

<style lang="less" scoped>
.search-history_container {
  .operate {
    span {
      margin-left: 10px;
    }
  }
}
</style>
