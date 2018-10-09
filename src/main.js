// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
import './mixins'
Vue.config.productionTip = false

import 'babel-polyfill'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);

Vue.config.devtools = true
/* eslint-disable no-new */

// router.afterEach(function (to,from) {
    // console.log('成功浏览到to: ' ,to.path);
    // console.log('成功浏览到from: ' ,from.path);
// })

import divider from './UIcomponents/divide'
Vue.component('divider',divider)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
