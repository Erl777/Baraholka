import Vue from 'vue'
import Vuex from 'vuex'
import auth from "@/store/models/user/auth";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    token: null
  },
  mutations: {
    setUserToStore(state, payload){
      state.user = payload
    },
    clearToken(state){
      state.token = null;
    },
    clearUserFromStore(state){
      state.user = null
    },
    setToken(state, payload){
      state.token = payload;
    }
  },
  actions: {
  },
  modules: {
    auth
  }
})
