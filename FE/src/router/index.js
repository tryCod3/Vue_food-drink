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
        path: "/:location/:tagItem",
        name: "locations-item",
        props: true,
        component: () =>
            import(
                /* webpackChunkName: "locationsItem"*/
                "@/view/InformationView"
                ),
    },
    {
        path: "/:location/:tagItem/watch/:filter",
        name: "location-item-watch",
        props: true,
        component: () => import(/* webpackChunkName: "location-item-watch"*/ '@/view/PageShowListView')
    },
    {
        path: "/:location/:tagItem/detail/:id",
        name: "location-item-detail-id",
        props: true,
        component: () => import(/* webpackChunkName: "location-item-detail-id"*/ '@/view/CartDetailView')
    }

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