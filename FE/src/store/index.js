import Vue from 'vue';
import Vuex from "vuex";

import {langStore} from "@/store/lang";


Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {langStore},
    state: {},
    getters: {},
    mutations: {},
    action: {}
})

export default store;

