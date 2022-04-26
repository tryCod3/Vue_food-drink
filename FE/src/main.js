import Vue from "vue";
import App from "./App.vue";
import i18n from '@/lang'
import store from '@/store'
import router from "@/router";
import "./index.css";

Vue.config.productionTip = false;


const app = new Vue({
    i18n,
    store,
    router,
    render: h => h(App),
}).$mount("#app");


export default app;