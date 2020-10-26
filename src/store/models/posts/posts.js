import api from '@/api';

export default {
    state: {
        posts: null
    },
    actions: {
        async getPosts({commit}) {
            return await api
                .get("/posts" )
                .then(response => {
                    console.log("response", response);
                    commit('setPosts', response.data);
                    return response;
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
                    console.log("response", response);
                    return response;
                })
                .catch(error => {
                    console.log("error", error);
                    return `Email не найден`
                });
        },
    },
    mutations: {
        setPosts(state, payload ){
            state.posts = payload
        }
    }
}