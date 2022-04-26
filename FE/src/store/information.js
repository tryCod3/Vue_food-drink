import app from "@/main";
import INFORMATION from "@/constan/information";

import {coverRoute} from "@/util";

export const informationStore = {
    namespaced: true, state: {
        lang: 'vn',
        location: {
            name: coverRoute("Đà Nẵng"),
            count: 9923
        },
        item: 'food'
    }, getters: {
        [INFORMATION.LANG.GET](state) {
            return state.lang;
        }, [INFORMATION.LOCATION.GET](state) {
            return state.location;
        }, [INFORMATION.ITEM.GET](state) {
            return state.item;
        },
    }, mutations: {
        [INFORMATION.LANG.SET](state, payload) {
            state.lang = payload;
            app.$i18n.locale = payload;
        }, [INFORMATION.LOCATION.SET](state, payload) {
            const keys = Object.keys(payload);
            for (let i = 0; i < keys.length; i++) {
                state.location[keys[i]] = payload[keys[i]];
            }
        }, [INFORMATION.ITEM.SET](state, payload) {
            state.item = coverRoute(payload);
        },
    }, actions: {
        [INFORMATION.LANG.SET]({commit}, payload) {
            commit(INFORMATION.LANG.SET, payload);
        },
        [INFORMATION.LOCATION.SET]({commit}, payload) {
            commit(INFORMATION.LOCATION.SET, payload);
        },
        [INFORMATION.ITEM.SET]({commit}, payload) {
            commit(INFORMATION.ITEM.SET, payload);
        }
    }
}

