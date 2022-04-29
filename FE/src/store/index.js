import Vue from 'vue';
import Vuex from "vuex";

import {informationStore} from "@/store/information";
import {userStore} from "@/store/user";

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {informationStore, userStore},
    state: {},
    getters: {},
    mutations: {},
    action: {}
})

export default store;

