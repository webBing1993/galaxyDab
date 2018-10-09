module.exports = {
  // 获取角色组织树
  roleManageTree(ctx, params) {
    ctx.dispatch('request', {
      // url: `/permission/getall`,
      url: `/org/getOrganizationTree`,
      method: 'get',
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },

  // 获取角色列表url:/role/getrolesbyorgid/{orgid}
  roleList(ctx, params) {
    ctx.dispatch('request', {
      url: `/role/getrolesbyorgid/${params.orgid}`,
      method: 'get',
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
  // 添加角色url:/
  addrole(ctx, params) {
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
  //修改角色url:url:/role/updaterole
  changeRole(ctx, params) {
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
      onFail: (body) => {
        params.onfail && params.onfail(body)
      }
    })
  },
}
