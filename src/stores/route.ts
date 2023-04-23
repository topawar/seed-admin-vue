import {defineStore} from "pinia";


interface state {
    keepaliveRoute: routeInfo[]
}

export const useRouteStore = defineStore("routeStore", {
    state: () => {
        let initRoute = [{routePath: "/home", routeName: "首页", routeKeepAlive: true}]
        return {
            keepaliveRoute: initRoute || [] as routeInfo[],
            // tokenId: ""
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
            this.keepaliveRoute.splice(0, this.keepaliveRoute.length, ...filterRoute)
        },
    },
    // persist: {
    //     enabled: true,
    //     strategies: [
    //         {
    //             key:"tokenId",
    //             storage: localStorage,
    //             paths: ['tokenId']
    //         }
    //     ]
    // }
})

export interface routeInfo {
    routePath: string,
    routeName: string,
    routeKeepAlive: boolean
}

