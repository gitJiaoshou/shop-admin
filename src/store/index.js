import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  // 公用数据
  state: {
    isCollapse: false,
    user: null
  },
  actions: {
    changCollapse (ctx, isCollapse) {
      ctx.commit('changCollapse', isCollapse)
    },
    changUser (ctx, user) {
      ctx.commit('changUser', user)
    }
  },
  mutations: {
    changCollapse (state, isCollapse) {
      state.isCollapse = isCollapse
    },
    changUser (state, user) {
      state.user = user
    }
  }
})
