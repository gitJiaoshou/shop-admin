import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  // 公用数据
  state: {
    isCollapse: false
  },
  actions: {
    changCollapse (ctx, isCollapse) {
      ctx.commit('changCollapse', isCollapse)
    }
  },
  mutations: {
    changCollapse (state, isCollapse) {
      state.isCollapse = isCollapse
    }
  }
})
