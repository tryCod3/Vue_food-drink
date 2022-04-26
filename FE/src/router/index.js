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
                '@/view/PageShowListView'
                )

    },
    {
        path: "/:location/:tagItem",
        name: "locationsItem",
        props: true,
        component: () =>
            import(
                /* webpackChunkName: "locationsItem"*/
                "@/view/InformationView"
                ),
        children: [{
            path: ":filter",
            name: "locationsItemFilter",
            props: true,
            component: () =>
                import(
                    /* webpackChunkName: "locationsItemFilter"*/
                    "@/view/PageShowListView"
                    )
        }]
    }
]

const router = new Router({
    mode: "history",
    routes
})

// router.beforeEach((to, from, next) => {
//     console.log(from, to, to.params);
//     if (to.params.loaction)
//         to.params.location = coverRoute(to.params.location);
//     if (to.params.tagItem)
//         to.params.tagItem = coverRoute(to.params.tagItem)
//     next()
// });
export default router