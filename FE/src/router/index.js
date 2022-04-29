import Vue from 'vue';
import Router from 'vue-router'


Vue.use(Router);

const routes = [
    {
        path: "/",
        name: "home",
        component: () =>
            import(
                /* webpackChunkName: "home"*/
                '@/view/InformationView'
                )

    },
    {
        path: "/home/:location/:tagItem",
        name: "location-item",
        component: () =>
            import(
                /* webpackChunkName: "locationsItem"*/
                "@/view/InformationView"
                ),
    },
    {
        path: "/home/:location/:tagItem/watch",
        name: "location-item-watch",
        props: true,
        component: () => import(/* webpackChunkName: "location-item-watch"*/ '@/view/PageShowListView')
    },
    {
        path: "/cart/:location/:tagItem/detail/:id",
        name: "cart-detail",
        props: true,
        component: () => import(/* webpackChunkName: "location-item-detail-id"*/ '@/view/CartDetailView')
    },
    {
        path: "/cart/add",
        name: "cart-add",
        component: () => import(/* webpackChunkName: "cart-add"*/ '@/view/FormCartView')
    },
    {
        path: "/user/login",
        name: "user-login",
        component: () => import(/* webpackChunkName: "user-login"*/ '@/view/FormUserView')
    },
]

const router = new Router({
    mode: "history",
    linkExactActiveClass: "my-color-link",
    routes
})

// router.beforeEach((to, from, next) => {
//
// });
export default router
