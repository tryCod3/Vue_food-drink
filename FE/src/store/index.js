import Vue from 'vue';
import Vuex from "vuex";

import {langStore} from "@/store/lang";
import {tagStore} from "@/store/tag";

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {langStore, tagStore},
    state: {},
    getters: {},
    mutations: {},
    action: {}
})

export default store;

