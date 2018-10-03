module.exports = {
  // 获取角色模板列表
  roleTemplateList(ctx, params) {
    ctx.dispatch('request', {
      url: `/permission/getall`,
      method: 'get',
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },

  // 添加角色模板列表url:/role/addrole
  addRole(ctx, params) {
    ctx.dispatch('request', {
      url: `/role/addrole`,
      method: 'POST',
      body: {
        name:params.name,
        alias:params.alias,
        description:params.description,
      },
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: (body) => {
        params.onfail && params.onfail(body)
      }
    })
  },
  // 描述:获取详情表 url:/permission/getbyid/{permissionid}
  // authNodeDetail(ctx, params) {
  //   ctx.dispatch('request', {
  //     url: `/permission/getbyid/${params.permissionid}`,
  //     method: 'get',
  //     onSuccess: (body) => {
  //       params.onsuccess && params.onsuccess(body)
  //     },
  //     onFail: body => {
  //       params.onfail && params.onfail(body)
  //     }
  //   })
  // },
  // 修改组织机构详细信息url:/role/updaterole
  modifyRole(ctx, params) {
    ctx.dispatch('request', {
      url: `/role/updaterole`,
      method: 'POST',
      body: {
        id:params.id,
        name:params.name,
        alias:params.alias,
        description:params.description,
      },
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },


  // 描述:删除 url:/permission/delete
  authTree(ctx, params) {
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
