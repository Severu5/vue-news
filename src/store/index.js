import { USER_KEY } from '@/utils/constants'
import { getItem, setItem } from '@/utils/storage'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY) || null
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      setItem(USER_KEY, state.user)
    }
  },
  actions: {},
  modules: {}
})
