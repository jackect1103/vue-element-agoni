import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import action from './action'

Vue.use(Vuex)


const state = {
  login: false,   // 是否登录
  managerInfo: null, // 用户信息
  story: [],   // 小说列表
  article: [],   // 文章列表
}

export default new Vuex.Store({
  state,
  action,
  mutations
})
