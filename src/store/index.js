import { USER_KEY } from '@/utils/constants'
import { getItem, setItem } from '@/utils/storage'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY) || null,
    cachePages: ['LayoutIndex']
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      setItem(USER_KEY, state.user)
    },
    addCachePage(state, pageName) {
      if (!state.cachePages.includes(pageName)) {
        state.cachePages.push(pageName)
      }
    },
    removeCachePage(state, pageName) {
      const index = state.cachePages.indexOf(pageName)
      if (index !== -1) {
        state.cachePages.splice(index, 1)
      }
    }
  },
  actions: {},
  modules: {}
})
