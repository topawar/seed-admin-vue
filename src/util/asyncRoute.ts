import router from "../routers";
import {syncRoute} from "../api/router/routerRequest";

export function initRoute() {
    router.getRoutes().forEach(item => {
        const {path, meta} = item
        syncRoute({path: path, meta: JSON.stringify(meta)}).then(r => console.log(r))
    })
}