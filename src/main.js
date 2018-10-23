// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './mixins'
import './style/reset.css'
import 'babel-polyfill'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import axios from "axios"
Vue.prototype.axios = axios
Vue.prototype.Home = '/api'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
//Ueditor  基础文件引入
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)
Vue.config.productionTip = false
Vue.use(iView);
/* eslint-disable no-new */

router.afterEach(function(to, from) {
  // console.log('成功浏览到to: ', to.path)
  // console.log('成功浏览到from: ', from.path)
})

// import divider from './UIcomponents/divide'
// Vue.component('divider', divider)
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
