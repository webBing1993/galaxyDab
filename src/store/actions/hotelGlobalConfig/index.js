import qs from 'qs'

module.exports = {
  // 获取在住服务配置项列表
  getConfigList (ctx, params) {
    ctx.dispatch('request', {
      url: '/hotelGlobalConfig/all',
      method: 'post',
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
  // 获取在住服务配置项分页列表
  getConfigPage (ctx, params) {
    ctx.dispatch('request', {
      url: '/hotelGlobalConfig/page',
      method: 'post',
      body: params.data,
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
  // 添加在住服务配置
  addConfig (ctx, params) {
    ctx.dispatch('request', {
      url: '/hotelGlobalConfig/save',
      method: 'put',
      body: params.data,
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
  // 修改在住服务配置
  updateConfig (ctx, params) {
    ctx.dispatch('request', {
      url: '/hotelGlobalConfig/update',
      method: 'post',
      body: params.data,
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
  // 删除在住服务配置
  delConfig (ctx, params) {
    ctx.dispatch('request', {
      url: '/hotelGlobalConfig/delete',
      method: 'post',
      body: qs.stringify(params.data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },

}
