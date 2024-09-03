import '@babel/polyfill';
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import VueRouter from 'vue-router';
import router from './router';
import store from './store';
import svgSymbolIcon from '@svgjs/vue2-symbol-icon';
import ElementUI from './elementui';
import {
  regexp
 } from '@/utils/regexp.js';


import './assets/css/element-variables.scss';
import './assets/css/bidexpert.scss';

import AFTableColumn from 'af-table-column';
Vue.use(AFTableColumn);

import EllipsisTip from '@/components/ellipsisTip.vue';
Vue.component('EllipsisTip', EllipsisTip);

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(svgSymbolIcon);

Vue.prototype.$globalRegexp = regexp;


new Vue({
  render: h=>h(App),
  store,
  router
}).$mount('#app');