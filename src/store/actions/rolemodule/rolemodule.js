module.exports = {


  // 获取角色模板列表
  roleTemplateList(ctx, params) {
    ctx.dispatch('request', {
      url: `/role/getroletemplates`,
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
        name: params.name,
        alias: params.alias,
        description: params.description,
      },
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: (body) => {
        params.onfail && params.onfail(body)
      }
    })
  },

  // 修改组织机构详细信息url:/role/updaterole
  modifyRole(ctx, params) {
    ctx.dispatch('request', {
      url: `/role/updaterole`,
      method: 'POST',
      body: {
        id: params.id,
        name: params.name,
        alias: params.alias,
        description: params.description,
      },
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
  // 3.根据模版角色查看权限1/role/getpermissionbytemp/a165d8b9c7304b789b991bac18e914fe

  getAuthByTemp(ctx, params) {
    ctx.dispatch('request', {
      url: `/role/getpermissionbytemp/${params.tempid}`,
      method: 'get',
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
  // qa.fortrun.cn:9201/role/setpermissiontotemp
  setTempAuth(ctx, params) {
    ctx.dispatch('request', {
      url: `/role/setpermissiontotemp`,
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

}
