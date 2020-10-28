import api from '@/api';
// import store from "../../index";

export default {
    state: {
        posts: []
    },
    actions: {
        async getPosts({commit}) {
            return await api
                .get("/posts" )
                .then(response => {
                    // console.log("response", response);
                    (async function () {
                        await commit('setPosts', response.data);
                    }());
                    return response.data;
                })
                .catch(error => {
                    console.log("error", error);
                    return ` Постов нет `
                });
        },
        async getPost({dispatch, commit}, id) {
            return await api
                .get("/post/" + id )
                .then(response => {
                    // console.log("response", response);
                    return response.data;
                })
                .catch(error => {
                    console.log("error", error);
                    return `Post не найден`
                });
        },
    },
    mutations: {
        setPosts(state, payload){
            state.posts = payload
        },
    },
    getters: {
        getPosts: state => {
            return state.posts;
        }
    }
}