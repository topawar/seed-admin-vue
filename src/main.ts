import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./routers";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import pinia from "./stores/route"




const app = createApp(App);
app.use(ElementPlus);
app.use(router)
app.use(pinia)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount("#app");
