import Vue from 'vue';
import Router from 'vue-router';
import hh from "../pages/index.vue";
import agreement from "../pages/dangerHold/index.vue";
import zuiti from "../pages/zuiti";
import flex from "../pages/flex";
import map from "../pages/map";

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'home',
        component: hh,
        meta: { title: "首页" }
    }, {
        path: "/dangeHold",
        name: "table",
        component: agreement,
        meta: { title: "表格生成" }
    }, {
        path: "/zuiti",
        name: "zuiti",
        component: zuiti,
        meta: { title: "3d椎体" }
    }, {
        path: "/flex",
        name: "flex",
        component: flex,
        meta: { title: "弹性效果" }
    }, {
        path: "/map",
        name: "map",
        component: map,
        meta: { title: "svg地图" }
    }, {
        path: "/eye",
        name: "eye",
        component: () =>
            import ("../pages/eye"),
        meta: { title: "写轮眼", login: true }
    }, {
        path: "/schedule",
        name: "schedule",
        component: () =>
            import ("../pages/schedule"),
        meta: { title: "进度条" }
    }, {
        path: "/svgflex",
        name: "svgflex",
        component: () =>
            import ("../pages/svgflex"),
        meta: { title: "倒影" }
    }]
});