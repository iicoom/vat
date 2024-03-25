import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import router from "./router";
import ElementPlus from "element-plus";
//@ts-ignore
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/display.css";

const app = createApp(App);

app.use(ElementPlus, {
  locale: zhCn,
});
app.use(router);

app.mount("#app");
