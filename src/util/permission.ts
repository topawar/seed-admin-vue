import router from "../routers";
import {login} from "../api/user/userRequest";
router.beforeEach(async (to, from, next) => {
    const result = await login({name: '', password: ''})
    console.log("to path " + to.path)
    if (to.path == "/user/login") {
        if (result != null) {
            console.log("result 不为空走")
            next("/");
        } else {
            console.log("result 为空走")
            next()
        }
    } else {
        console.log("不是登录页走")
        next();
    }
})