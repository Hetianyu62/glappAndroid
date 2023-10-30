import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);


const routes = [
    { path: "/", redirect: "/patients/info", invisible: true },
    // 添加患者
    {
        path: "/patients/info/add",
        component: () => import("@/pages/patients/info/Add")
    },
    // 患者信息
    {
        path: "/patients",
        component: () => import("@/pages/patients/Index"),
        redirect: "/patients/info",
        children: [
            {
                path: "/patients/info",
                component: () => import("@/pages/patients/info/Index")
            },
            {
                path: "/patients/examines",
                component: () => import("@/pages/patients/examines/Index")
            },
            {
                path: "/patients/diagnoses",
                component: () => import("@/pages/patients/diagnoses/Index")
            },
            {
                path: "/patients/samples",
                component: () => import("@/pages/patients/samples/Index")
            },
            {
                path: "/patients/reserves",
                component: () => import("@/pages/patients/reserves/Index")
            },

        ]
    },

    {
        path: "/patients/examines/details",
        component: () => import("@/pages/patients/examines/Details")
    },
    {
        path: "/patients/samples/details",
        component: () => import("@/pages/patients/samples/Details")
    },
    {
        path: "/patients/diagnoses/details",
        component: () => import("@/pages/patients/diagnoses/Details"),
        children: [
            {
                path: "/patients/diagnoses/status",
                component: () => import("@/pages//patients/diagnoses/status/Index")
            },
            {
                path: "/patients/diagnoses/past",
                component: () => import("@/pages//patients/diagnoses/past/Index"),
                children: [
                    {
                        path: "/patients/diagnoses/past/disease",
                        component: () => import("@/pages//patients/diagnoses/past/Disease")
                    },
                    {
                        path: "/patients/diagnoses/past/medication",
                        component: () => import("@/pages//patients/diagnoses/past/Medication")
                    },
                    {
                        path: "/patients/diagnoses/past/fracture",
                        component: () => import("@/pages//patients/diagnoses/past/Fracture")
                    },
                    {
                        path: "/patients/diagnoses/past/operation",
                        component: () => import("@/pages//patients/diagnoses/past/Operation")
                    },
                ]
            },
            {
                path: "/patients/diagnoses/personal",
                component: () => import("@/pages//patients/diagnoses/personal/Index"),
                children: [
                    {
                        path: "/patients/diagnoses/personal/personal",
                        component: () => import("@/pages//patients/diagnoses/personal/Personal")
                    },
                    {
                        path: "/patients/diagnoses/personal/marriages",
                        component: () => import("@/pages//patients/diagnoses/personal/Marriages")
                    },
                    {
                        path: "/patients/diagnoses/personal/families",
                        component: () => import("@/pages//patients/diagnoses/personal/Families")
                    }
                ]
            },
            {
                path: "/patients/diagnoses/inspect",
                component: () => import("@/pages//patients/diagnoses/inspect/Index")
            },
            {
                path: "/patients/diagnoses/diagnosis",
                component: () => import("@/pages//patients/diagnoses/diagnosis/Index")
            },
        ]
    }
];

const router = new Router({
    base: "admin/",
    // mode: "history",
    routes: routes
});

export default router;
