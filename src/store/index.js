import Vue from 'vue'
import Vuex from 'vuex'
import auth from "@/store/models/user/auth";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUserToStore(state, payload){
      state.user = payload
    }
  },
  actions: {
  },
  modules: {
    auth
  }
})
