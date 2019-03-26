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
router.beforeEach((to,from,next)=>{
  let token = sessionStorage.getItem('session_id');
  if(token){
    next();
  }
  else{
    if(to.path!=='/login'){
      next({path:'/login'})
    }
    else{
      next()
    }

  }
})
Vue.http.interceptors.push((request, next)  =>{
  // 登录成功后将后台返回的TOKEN在本地存下来,每次请求从sessionStorage中拿到存储的TOKEN值
  let TOKEN= sessionStorage.getItem('session_id');
  console.log('tocken',TOKEN)
  if(TOKEN){
    // 如果请求时TOKEN存在,就为每次请求的headers中设置好TOKEN,后台根据headers中的TOKEN判断是否放行

    request.headers.set('token',TOKEN);
  }
  next((response) => {
    // console.log(response.body.code)
    // if(response.body.code==10010){//与后台约定登录失效的返回码
    //   var data=response.body.data
    //   // console.log('000')
    //   window.location.href = "/#/login"
    // }
    // if(response.status!=200){
    //   console.log(response.status)
    //   Vue.prototype.$message('服务器暂时无法响应')
    //   return response;
    // }else{
    //   if(response.body.code!=0){
    //     if(response.body.msg){
    //       Vue.prototype.$message(response.body.msg)
    //     }
    //     return response;
    //   }
    // }
    return response;
  })
})
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
