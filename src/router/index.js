import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// const time= new Date().getTime()
const routes = [

    { path: "/", redirect: "/home", invisible: true, },
    {
        path: "/home",
        // query: { time: new Date().getTime() },
        component: () =>
            import ("@/pages/home/Index")
    },
    {
        name: 'login',
        path: "/login",
        component: () =>
            import ("@/pages/user/Login")
    },
    {
        path: "/patient",
        component: () =>
            import ("@/pages/patient/Index"),
        children: [{
                path: "/patient/reserve",
                component: () =>
                    import ("@/pages/patient/Reserve")
            },
            {
                path: "/patient/list",
                component: () =>
                    import ("@/pages/patient/List")
            }
        ]
    },
    {
        path: "/reserve",
        component: () =>
            import ("@/pages/reserve/Index")
    },
    {
        path: "/reserve/replace",
        component: () =>
            import ("@/pages/reserve/Replace")
    },
    {
        path: "/reserve/add",
        component: () =>
            import ("@/pages/reserve/Add")
    },
    {
        path: "/user/info",
        query: { aaa: 111 },
        component: () =>
            import ("@/pages/user/Info")
    },
    {
        path: "/patient/yyList",
        component: () =>
            import ("@/pages/patient/yyList")
    },
    {
        path: "/register",
        component: () =>
            import ("@/pages/reg/register")
    },

];

const router = new Router({
    // base: "admin/",
     mode: "hash",
    routes: routes
});
router.beforeEach((to, from, next) => {
    //判断该页面有channel
    if (from.query.channel) {
        //路由切换时，如果没有就添加，有就跳过执行，添加固定参数
        if (!to.query.channel) {
            //准备一个跳转的query对象
            let query = to.query
            query.channel = 555555
            next({
                path: to.path,
                query: query
            })
        } else {
            next()
        }
    } else {
        next()
    }
})
export default router;