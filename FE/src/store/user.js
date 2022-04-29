import USER from "@/constan/user";


export const userStore = {
    namespaced: true,
    getters: {
        [USER.MODEL.GET]() {
            console.log("model = ", JSON.parse(localStorage.getItem('model')))
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
            console.log("SETTTTTTTTTTTTTTT")
            commit(USER.MODEL.SET, payload);
        },
    }
}


