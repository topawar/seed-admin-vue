import {defineStore} from "pinia";
import {state} from "vue-tsc/out/shared";
import {createPinia} from "pinia";

export default createPinia()

interface state {
    keepaliveRoute: routeInfo[]
}

export const useRouteStore = defineStore("routeStore", {
    state: () => {
        let initRoute = [{routePath: "/home", routeName: "首页", routeKeepAlive: true}]
        return {
            keepaliveRoute: initRoute || [] as routeInfo[],
        }
    },
    getters: {
        getKeepaliveRoute: (state) => state.keepaliveRoute
    },
    actions: {
        addKeepaliveRoute(route: routeInfo) {
            const elementIndex = this.keepaliveRoute.findIndex(item => item.routePath == route.routePath)
            if (elementIndex < 0) {
                this.keepaliveRoute.push(route)
            }

        },
        removeKeepaliveRoute(routePath: any) {
            const filterRoute = this.keepaliveRoute.filter(rt => rt.routePath != routePath)
            this.keepaliveRoute.splice(0,this.keepaliveRoute.length,...filterRoute)
        },
    }
})

export interface routeInfo {
    routePath: string,
    routeName: string,
    routeKeepAlive: boolean
}

