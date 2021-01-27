import Vue from 'vue';
import Vuex from 'vuex';
import auth from '@/store/models/user/auth';
import posts from '@/store/models/posts/posts';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    token: null,
    headerKey: 0,
  },
  mutations: {
    setUserToStore(state, user) {
      state.user = user;
    },
    clearToken(state) {
      state.token = null;
    },
    clearUserFromStore(state) {
      state.user = null;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    AWESOME_ACTION_WITH_PROMISE(ctx, url) {
      return new Promise((resolve, reject) => {
        axios.get(url)
          .then(response => {
            console.log(response);
            resolve(response);
          })
          .catch(error => {
            console.error(error);
            reject(error);
          });
      });
    },
  },
  modules: {
    auth,
    posts,
  },
  getters: {
    getUser: state => state.user,
  },
});
