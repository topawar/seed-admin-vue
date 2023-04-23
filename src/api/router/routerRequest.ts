import {http} from "../request";
import {router} from "./type";

export function syncRoute(router: router) {
    return http.post("/route/syncRoute", router)
}

export function getRouteList() {
    return http.post("/route/getRouteList")
}