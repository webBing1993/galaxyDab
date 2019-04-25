import Vue from 'vue'
import VueResource from 'vue-resource'
import router from '../../router/index.js'
import axios from 'axios'
import base_api from './../../apiurl.js';
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
  },
  //------------------当是ecard-dashboard的时候走下面的路径---------------------
  resource: (ctx, param) => {
    let baseurl = base_api.baseurl;
    // console.log ('baseurl:', baseurl);
    let headers = param.headers || {};
    Vue.http ({
      url: baseurl + param.url,//wqtenv/wqtversion
      body: param.body || null,
      headers: headers,
      params: param.params || null,
      method: param.method || "GET",
      timeout: param.timeout || 60000,
      credentials: false,
      emulateHTTP: false,
      emulateJSON: true,
      // emulateJSON: false,
    }).then (
      response => {
        if (response.body.code === 0) {
          param.onSuccess ? param.onSuccess (response.body, response.headers) : null
        } else if (response.body.code === 10005) {
          param.onSuccess ? param.onSuccess (response.body, response.headers) : null
        } else {
          let toastParam = {text: response.body.msg, time: 1000};
          // ctx.dispatch('showToast',toastParam);
          param.onFail ? param.onFail (response.body) : null
        }
      }
    ).catch (
      error => {
        //ErrorCallback
        console.log ('error:', error);
        let hint = '';
        if (error.status === 401) {
          hint = '登录失效!'
        } else if (error.status === 1) {
          hint = '请求超时!';
        } else {
          hint = '请求失败'
        }
        // ctx.dispatch('showToast', hint);
      }
    ).finally (
      final => {
        // isRefresh ? ctx.dispatch('showprogress', {show: false, isOk: true}) : ctx.commit('LOADING');
      }
    )
  },
  //--------------------------当是b端的时候走以下路线----------------------------
  request: (ctx, param) => {
      ctx.dispatch ('showLoading', true);
      let headers = param.headers || {};
      headers.Session = sessionStorage.getItem('session_id');
      headers.token = sessionStorage.getItem('token');
      axios({
        url: param.url,
        method: param.method || 'GET',
        baseURL: '/galaxy-front',
        // baseURL: ':9201',
        headers: headers,
        params: param.params || null,
        data: param.body || null,
        timeout: param.timeout || 60000
      }).then(response => {
        ctx.dispatch ('showLoading', false);
        if (response.config.url.match('export')) {
          param.onSuccess && param.onSuccess(response)
        }
        else if (+response.data.errcode === 0 || +response.status === 204) {
          param.onSuccess && param.onSuccess(response.data, response.headers)
        } else if(response.data.errcode ==2){
          param.onSuccess && param.onSuccess(response.data, response.headers)

        }
        else if (response.data.errcode !== 0) {
          param.onFail && param.onFail(response)
        }
        else {
          param.onFail && param.onFail(response)
        }
      }).catch(
        error => {
          ctx.dispatch ('showLoading', false);
          if(error){
            console.log(error)
          }
          let status = error.response.status;
          if (status === 401) {
            router.push('/login')
          }
        }
      )
    // }

  }


}


