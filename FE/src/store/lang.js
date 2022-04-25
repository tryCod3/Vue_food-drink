import app from "@/main";
import LANG from "@/constan/lang";

export const langStore = {
    namespaced: true, state: {
        lang: 'vn'
    }, getters: {
        [LANG.GET_LANGUAGE](state) {
            return state.lang;
        }
    }, mutations: {
        [LANG.SET](state, payload) {
            state.lang = payload;
            console.log(app.$i18n.locale, payload)
            app.$i18n.locale = payload;
        },
        [LANG.SET_LANGUAGE](state, payload) {
            state.lang = payload;
        }
    }, actions: {
        [LANG.SET]({commit}, payload) {
            commit(LANG.SET, payload);
        },
        [LANG.SET_LANGUAGE]({commit}, payload) {
            commit(LANG.SET_LANGUAGE, payload);
        }
    }
}

