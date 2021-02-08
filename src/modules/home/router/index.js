import Vue from 'vue';
import Router from 'vue-router';
import hh from "../pages/index.vue";
import agreement from "../pages/dangerHold/index.vue";
import zuiti from "../pages/zuiti";
import flex from "../pages/flex";
Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'home',
        component: hh
    }, {
        path: "/dangeHold",
        name: "table",
        component: agreement
    }, {
        path: "/zuiti",
        name: "zuiti",
        component: zuiti
    }, {
        path: "/flex",
        name: "flex",
        component: flex
    }]
});