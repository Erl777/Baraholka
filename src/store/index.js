import Vue from 'vue'
import Vuex from 'vuex'
import auth from "@/store/models/user/auth";
import posts from "@/store/models/posts/posts"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    token: null,
    headerKey: 0
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
    },
    changeHeaderKey(state){
      state.headerKey++;
    }
  },
  actions: {
  },
  modules: {
    auth,
    posts
  },
  getters: {
    getHeaderKey: state => {
      return state.headerKey
    },
    getUser: state => {
      return state.user
    }
  }
})
