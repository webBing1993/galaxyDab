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
        orgId: params.orgId,
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
        roleId: params.roleId,
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
  // 描述:从⻆色模版复制 url:/role/copyroletemp
  copyroletemp(ctx, params) {
    ctx.dispatch('request', {
      url: `/role/copyroletemp`,
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
  // 描述:从⻆色模版引用 url:/role/refersroletemp
  refersroletemp(ctx, params) {
    ctx.dispatch('request', {
      url: `/role/refersroletemp`,
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

  // 1.根据角色查看权限 qa.fortrun.cn:9201/role/getpermissionbyrole/499360081234624512
  getAuthByAuth(ctx, params) {
    ctx.dispatch('request', {
      url: `/role/getpermissionbyrole/${params.roleId}`,
      method: 'get',
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: (body) => {
        params.onfail && params.onfail(body)
      }
    })
  },
  // 2.给角色设置权限qa.fortrun.cn:9201/role/setpermission
  setAuth(ctx, params) {
    ctx.dispatch('request', {
      url: `/role/setpermission`,
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
  // 角色名称筛选的：http://qa.fortrun.cn:9201/role/getrolesbyorgid/100000000000000136?name=孙书敬你是谁
  searchRole(ctx, params) {
    ctx.dispatch('request', {
      url: `/role/getrolesbyorgid/${params.orgid}?name=${params.name}`,
      method: 'get',
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },

}
