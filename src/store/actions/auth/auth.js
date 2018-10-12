module.exports = {

  // 获取权限组织树
  authTree(ctx, params) {
    ctx.dispatch('request', {
      url: `/permission/getall`,
      // url: `/org/getOrganizationTree`,
      method: 'get',
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },

  // 添加权限
  addauth(ctx, params) {
    ctx.dispatch('request', {
      url: `/permission/add`,
      method: 'POST',
      body: {...params.fields},
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: (body) => {
        params.onfail && params.onfail(body)
      }
    })
  },
  // 描述:获取详情表 url:/permission/getbyid/{permissionid}
  authNodeDetail(ctx, params) {
    ctx.dispatch('request', {
      url: `/permission/getbyid/${params.permissionid}`,
      method: 'get',
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
  // 修改组织机构详细信息 url:/permission/update
  modifyAuth(ctx, params) {
    ctx.dispatch('request', {
      url: `/permission/update`,
      method: 'POST',
      body: {...params.fields},
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },


  // 描述:删除 url:/permission/delete
  delAuth(ctx, params) {
    ctx.dispatch('request', {
      url: `/permission/delete`,
      method: 'POST',
      body: {
        ids: params.ids
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
