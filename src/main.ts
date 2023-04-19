import {createApp} from "vue";
import "./style.css";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./routers";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import pinia from "./stores/route"
import {login} from "./api/user/userRequest";

const WHITE_LIST = ['/user/login']

router.beforeEach(async (to, from, next) => {
    if (to.path === "/user/login") {
        const result = await login({name: '', password: ''})
        // 这里相当于我不是去登录，我想访问:比如说个人中心，我的文章等需要权限才能查看的数据
        if (result) {
            next('/');
            return;
        } else {
            next('/user/login');
            return;
        }
    } else {
        // 这你相当于你要去登录，那么正常去登录页就行
        next();
        return;
    }
})


const app = createApp(App);
app.use(ElementPlus);
app.use(router)
app.use(pinia)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount("#app");
