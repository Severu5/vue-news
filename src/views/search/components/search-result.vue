<template>
  <div class='search-result_container'>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        :key="item.art_id"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearch } from '@/api/search'
export default {
  name: 'search-result',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      list: [],
      page: 1,
      perPage: 20
    }
  },
  methods: {
    async onLoad () {
      let params = {
        page: this.page,
        per_page: this.per_page,
        q: this.searchText
      }
      const { data } = await getSearch(params)
      if (data.results.length) {
        this.page++
      } else {
        this.finished = true
      }
      this.list.push(...data.results)
      this.loading = false
    }
  }
}
</script>
