import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tab: 'tab-0',
    id: null,
    username: null,
    password: null,
    firstName: null,
    lastName: null,
    plans: [],
    requests: [],
    suggestions: []
  },
  mutations: {
    setUserInfo (state, user) {
      state.id = user.id,
      state.username = user.username
      state.password = user.password
      state.firstName = user.firstName
      state.lastName = user.lastName
      state.plans = user.plans
      state.requests = user.requests
      state.suggestions = user.suggestions
    },
    changeTab (state, tab) {
      state.tab = tab
    },
    addPlan (state, plan) {
      state.plans.unshift(plan)
    }
  },
  actions: {

  }
})
