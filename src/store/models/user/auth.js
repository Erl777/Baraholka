import api from '@/api';
import store from "../../index";

export default {
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
        async register({dispatch, commit}, {email, password, name}) {
            try {
                // await firebase.auth().createUserWithEmailAndPassword(email, password)
                // const uid = await dispatch('getUid')
                // await firebase.database().ref(`/users/${uid}/info`).set({
                //     bill: 10000,
                //     name
                // })
            } catch (e) {
                // commit('setError', e)
                throw e
            }
        },
        // получение id пользователя из firebase
        // getUid(){
            // const user = firebase.auth().currentUser;
            // return user ? user.uid : null
        // },
        // async logout({commit}){
            // await firebase.auth().signOut();
            // commit('clearInfo')
        // }
    }
}