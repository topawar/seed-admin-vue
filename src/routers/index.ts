import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import container from "../views/Container/Index.vue";
import systemRouter from "./modules/system";

// 扩展继承属性
interface extendRoute {
    hidden?: boolean
}

export const asyncRoutes = [...systemRouter]

export const constantRoutes: Array<RouteRecordRaw & extendRoute> = [
    {
        path: '/',
        name: 'container',
        hidden: true,
        component: container,
        redirect: '/home',
        meta: {name: "首页"},
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import("../views/Home/Index.vue"),
                meta: {name: "首页"}
            },
        ]
    },
    {
        path: "/system",
        component: container,
        name: "system",
        redirect:"/system/page",
        meta:{name:"管理"},
        children: [
            {
                path: "articleSystem",
                name: "articleSystem",
                component: () => import("../views/System/articleSystem/Index.vue"),
                meta:{name:"文章管理"},
            },
            {
                path: "userSystem",
                name: "userSystem",
                component: () => import("../views/System/userSystem/Index.vue"),
                meta:{name:"用户管理"},
            },
            {
                path: "routeSystem",
                name: "routeSystem",
                component: () => import("../views/System/routeSystem/Index.vue"),
                meta:{name:"路由管理"},
            },
        ]
    },
    {
        path:'/user/login',
        name:'user',
        component: ()=> import("../views/Login/Index.vue"),
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes
})

export default router