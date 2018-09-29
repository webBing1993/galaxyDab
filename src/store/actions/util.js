
import Vue from 'vue'
import VueResource from 'vue-resource'
import router from '../../router/index.js'

Vue.use(VueResource)

module.exports = {
  goto: (ctx, param) => {
    if (typeof param === 'number') {
      router.go(param)
    } else {
      router.push(param)
    }
  },
  replaceto: (ctx, param) => {
    router.replace(param)
    // console.log('router:',router)
  },

  // 服务器请求
  resource: (ctx, param) => {
    let isRefresh = /hotel\/.+\/refresh/.test(param.url)
    // isRefresh ? ctx.dispatch('showprogress', {show: true, isOk: false}) : ctx.commit('LOADING', 1);
    Vue.http({
      // url: './gemini'+param.url,//wqtenv/wqtversion
      url: param.url, // wqtenv/wqtversion
      body: param.body || null,
      headers: param.headers || {
        // Session: sessionStorage.session_id
      },
      params: param.params || null,
      method: param.method || 'GET',
      timeout: param.timeout || 60000,
      credentials: false,
      emulateHTTP: false,
      emulateJSON: false
    }).then(
      response => {
        if (response.body.errcode && +response.body.errcode === 0) {
          param.onSuccess ? param.onSuccess(response.body, response.headers) : null
        } else {
          ctx.dispatch('showtoast', response.body.errmsg)
          param.onFail ? param.onFail(response.body) : null
        }
      }
    ).catch(
      error => {
        // ErrorCallback
        console.log('error:', error)
        let hint = ''
        if (error.status === 401) {
          hint = '登录失效!'
        } else if (error.status === 1) {
          hint = '请求超时!'
        } else {
          hint = '请求失败'
        }
        // ctx.dispatch('showtoast', hint);
      }
    ).finally(
      final => {
        // isRefresh ? ctx.dispatch('showprogress', {show: false, isOk: true}) : ctx.commit('LOADING');
      }
    )
  }

}
