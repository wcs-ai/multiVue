// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import theme from 'muse-ui/lib/theme';
import 'muse-ui/lib/styles/base.less';
import 'muse-ui/lib/styles/theme.less';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Loading from 'muse-ui-loading';
import axios from '@/utils/axios';

Vue.use(Loading);
theme.use('dark');

Vue.config.productionTip = false;
Vue.prototype.$rpc = axios;
/* eslint-disable no-new */
new Vue({
    el: '#home',
    router,
    components: { App },
    template: '<App/>'

});