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
        async deactivatePost({dispatch, commit}, postId) {
            await api
                .put("/posts/deactivate", {
                    id: postId,
                    active: false,
                })
                .catch(error => {
                    console.log("error", error);
                });
        },
        async activatePost({dispatch, commit}, postId) {
            await api
                .put("/posts/activate", {
                    id: postId,
                    active: true,
                })
                .catch(error => {
                    console.log("error", error);
                });
        },
        async addViewToPost({dispatch, commit}, postId) {
            await api
                .put("/posts/view", {
                    id: postId
                })
                .catch(error => {
                    console.log("error", error);
                });
        },
        async addPost({dispatch, commit}, data) {
            await api
                .post("/posts/add", data)
                .then(response => {
                    console.log("response", response);
                })
                .catch(error => {
                    console.log("error", error);
                });
        },
        async deletePost({dispatch, commit}, id) {
            return await api
                .delete("/posts/del/" + id )
                .then(response => {
                    // console.log("response", response);
                    return response.data;
                })
                .catch(error => {
                    console.log("error", error);
                    return `Post не найден`
                });
        },
        async editPost({dispatch, commit}, data) {
            return await api
                .put("/posts/edit", data)
                .then(response => {
                    console.log("response", response.data);
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
        },
    }
}