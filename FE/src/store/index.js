import Vue from 'vue';
import Vuex from "vuex";

import {informationStore} from "@/store/information";

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {informationStore},
    state: {},
    getters: {},
    mutations: {},
    action: {}
})

export default store;

