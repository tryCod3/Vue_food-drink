import USER from "@/constan/user";


export const userStore = {
    namespaced: true,
    getters: {
        [USER.MODEL.GET]() {
            return JSON.parse(localStorage.getItem('model'));
        },
    },
    mutations: {
        [USER.MODEL.SET](state, payload) {
            localStorage.setItem("model", JSON.stringify(payload))
        },
    },
    actions: {
        [USER.MODEL.SET]({commit}, payload) {
            commit(USER.MODEL.SET, payload);
        },
    }
}


