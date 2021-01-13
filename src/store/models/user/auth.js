import api from '@/api';
import store from "../../index";

export default {
    namespace: true,
    actions: {
        async login({dispatch, commit}, {email, password}) {
            return await api
                    .get("/users/" + email )
                    .then(response => {
                        console.log("response", response);
                        return response;
                    })
                    .catch(error => {
                        console.log("error", error);
                        return `Email ${email} не найден`
                    });
        },
        async getUserByToken({dispatch, commit}, token) {
            return await api
                .get("/users/token/" + token )
                .then(response => {
                    console.log("response", response);
                    store.commit('setUserToStore', response.data);
                    return response;
                })
                .catch(error => {
                    console.log("error", error);
                    return `Email ${token} не найден`
                });
        },
        async getUserById({dispatch, commit}, id) {
            return await api
                .get("/users/" + id )
                .then(response => {
                    console.log("response", response);
                    return response.data;
                })
                .catch(error => {
                    // console.log("error", error);
                    return null;
                });
        },
        async register({dispatch, commit}, data) {
            await api
                .post("/users/add", data)
                .then(response => {
                console.log("response", response);
                })
                .catch(error => {
                        console.log("error", error);
                });
        },
        async redactUser({dispatch, commit}, data) {
            await api
                .put("/users/edit", data)
                .catch(error => {
                    console.log("error", error);
                });
        },
    }
}