<template>
  <div class="search-suggestion">
    <van-cell
      v-for="suggestion in suggestionList"
      :key="suggestion"
      icon="search"
      @click="$emit('update-search', suggestion)"
    >
      <template #title>
        <div v-html="getKeyWords(suggestion)"></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search'
import { debounce } from 'lodash'

export default {
  name: 'searchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestionList: []
    }
  },
  watch: {
    searchText: {
      handler: debounce(function () {
        this.getSuggestion()
      }, 500),
      immediate: true
    }
  },
  methods: {
    async getSuggestion () {
      let params = {
        q: this.searchText
      }
      const { data } = await getSuggestion(params)
      this.suggestionList = [...data.options]
    },
    getKeyWords (str) {
      const key = this.searchText
      const reg = new RegExp(key, 'gi')
      const result = str.replace(reg, `<span class="red">${key}</span>`)
      return result
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.red {
  color: red;
}
</style>