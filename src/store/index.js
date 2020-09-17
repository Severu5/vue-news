import Vue from 'vue'
import Vuex from 'vuex'

import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY = 'news_user'

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY) || null
  },
  mutations: {
    setUser(state, user) {
      state.user = { ...user }
      setItem(USER_KEY, state.user)
    }
  },
  actions: {},
  modules: {}
})
