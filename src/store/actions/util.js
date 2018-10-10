
import Vue from 'vue'
import VueResource from 'vue-resource'
import router from '../../router/index.js'
import axios from 'axios'

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

  request: (ctx, param) => {
    let headers = param.headers || {};
      // headers.Session = "bdash_JGuVQ3oKnpX9VQYL1YtrtQ=="
      headers.Session = "bdash_BtLMdrbfRsC7C5E6rMgAkA=="
    axios({
      url: param.url,
      method: param.method || 'GET',
      baseURL: '/galaxy-front',
      headers: headers,
      params: param.params || null,
      data: param.body || null,
      timeout: param.timeout || 60000
    }).then(response => {
      if (response.config.url.match('export')) {
        param.onSuccess && param.onSuccess(response)
      } else if (+response.data.errcode === 0 || +response.status === 204) {
        param.onSuccess && param.onSuccess(response.data, response.headers)
      }else if(response.data.errcode!==0){
        param.onFail && param.onFail(response)
      }
      else {
        param.onFail && param.onFail(response)
      }
    }).catch(
      error => {
          console.log(error)
      }
    )
  }



}


