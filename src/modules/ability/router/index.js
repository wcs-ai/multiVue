import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'abc',
        component: () =>
            import ('../pages/index.vue')
    }]
})