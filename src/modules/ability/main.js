// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import theme from 'muse-ui/lib/theme';
import 'muse-ui/lib/styles/base.less';
import 'muse-ui/lib/styles/theme.less';

theme.use('dark');

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#ability',
    router,
    components: { App },
    template: '<App/>'
});