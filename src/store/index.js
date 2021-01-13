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
    setUserToStore(state, user){
      state.user = user
    },
    clearToken(state){
      state.token = null;
    },
    clearUserFromStore(state){
      state.user = null
    },
    setToken(state, token){
      state.token = token;
    },
  },
  actions: {
  },
  modules: {
    auth,
    posts
  },
  getters: {
    getUser: state => state.user
  }
})
