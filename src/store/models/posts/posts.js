import api from '@/api';
// import store from "../../index";

export default {
    namespace: true,
    state: {
        posts: []
    },
    actions: {
        async getPosts({commit}) {
            return await api
                .get("/posts" )
                .then(response => {
                    // console.log("response", response);

                    commit('setPosts', response.data);

                    return response.data;
                })
                .catch(error => {
                    console.log("error", error);
                    return ` Постов нет `
                });
        },
        async getPostsSortedByFilters({commit}, params) {
          const {minPrice, maxPrice, rubric, sortingBy, name} = params;
          return await api
            .get(`/posts/sort/${rubric}/${minPrice}/${maxPrice}/${sortingBy}/${name}`  )
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
        async changePostStatus({}, {postId, activate}){
            const url = activate ? 'activate' : 'deactivate'
            await api
                .put(`/posts/${url}`, {
                    id: postId,
                    active: activate,
                })
                .catch(error => {
                    console.log("error", error);
                });
        },
        async increaseViewsCounter({dispatch, commit}, postId) {
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
        setPosts(state, posts){
            state.posts = posts
        },
    },
    getters: {
        getPosts: state => state.posts,
    }
}
