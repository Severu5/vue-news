<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
    </form>
    <div class="search-body">
      <search-result
        v-if="isResultShow"
        :search-text="searchText"
      />
      <search-suggestion
        v-else-if="searchText"
        :search-text="searchText"
        @update-search="onSearch"
      />
      <search-history
        v-else
        :searchHistoryList="searchHistoryList"
        @delete-history="deleteHistory"
        @delete-all="deleteAll"
        @update-search="onSearch"
      />
    </div>
  </div>
</template>

<script>
import { getHistory, deleteHistory } from '@/api/search'
import { mapState } from 'vuex'
import { setItem, getItem } from '@/utils/storage'
import { USER_HISTORY } from '@/utils/constants'
import searchSuggestion from './components/search-suggestion'
import searchHistory from './components/search-history'
import searchResult from './components/search-result'

export default {
  name: 'SearchIndex',
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistoryList: []
    }
  },
  created () {
    this.getHisotryList()
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async getHisotryList () {
      const allHistory = getItem(USER_HISTORY) || []
      if (this.user) {
        const { data } = await getHistory()
        this.searchHistoryList = [...new Set([...data.keywords, ...allHistory])]
      } else {
        const list = getItem(USER_HISTORY)
        this.searchHistoryList = [...list]
      }
    },
    async deleteHistory (index) {
      this.searchHistoryList.splice(index, 1)
    },
    async deleteAll () {
      await deleteHistory()
      this.searchHistoryList = []
    },
    onSearch (searchText) {
      this.searchText = searchText
      const index = this.searchHistoryList.indexOf(searchText)
      if (index !== -1) {
        this.searchHistoryList.splice(index, 1)
      }
      this.searchHistoryList.unshift(searchText)
      this.isResultShow = true
    }
  },
  watch: {
    searchHistoryList (newVal) {
      setItem(USER_HISTORY, newVal)
    }
  },
  components: {
    searchSuggestion,
    searchHistory,
    searchResult
  }
}
</script>

<style lang="less" scoped>
.search-container {
  .search-body {
    position: fixed;
    top: 54px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
  }
}
</style>