import Vue from "vue";
import App from "./App.vue";
import i18n from '@/lang'
import store from '@/store'
import router from "@/router";
import VueSweetalert2 from 'vue-sweetalert2';


import "./index.css";
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false;
Vue.use(VueSweetalert2);


const app = new Vue({
    i18n,
    store,
    router,
    render: h => h(App),
}).$mount("#app");


export default app;