module.exports = {
  // 获取用户组织树
  UserManageTree(ctx, params) {
    ctx.dispatch('request', {
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
  // 根据组织机构id获取用户列表
  userList(ctx, params) {
    ctx.dispatch('request', {
      url: `/user/getusersbyorgid/${params.orgid}`,
      method: 'get',
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },

  // 添加用户
  adduser(ctx, params) {
    ctx.dispatch('request', {
      url: `/user/adduserinorg`,
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
  // 描述:获取组织机构详细信息 url:/org/get det ailbyid/{orgid}
  userNodeDetail(ctx, params) {
    ctx.dispatch('request', {
      url: `/org/getdetailbyid/${params.orgid}`,
      method: 'get',
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
  // 修改组织机构详细信息 url:/user/updat euser 请求方式post
  modifyuser(ctx, params) {
    ctx.dispatch('request', {
      url: `/user/updateuser`,
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


  // 描述:删除  http://qa.fortrun.cn:9201/user/deleteusers/1740cb0adbf547ae96f79a8b77ffd1d7
  // Method :delete
  delUser(ctx, params) {
    ctx.dispatch('request', {
      url: `/user/deleteusers/${params.userId}`,
      method: 'delete',
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
  // 描述:生成企业微信凭证 url:/user/createcredence
  qyWeath(ctx, params) {
    ctx.dispatch('request', {
      url: `/user/createcredence`,
      method: 'POST',
      body: {
        userIds: params.userIds
      },
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
  // 修改所属酒店
  computerChange(ctx,params) {
    ctx.dispatch('request',{
      url: `/org/user/updateUserHotel`,
      method: 'POST',
      body: {
        orgId: params.orgId,
        name: params.name,
        userId: params.userId
      },
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },

// role/getrolesbyorgid/100000000000000136
  // 获取备选角色列表
  readyRoleList(ctx, params) {
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
//  给用户设置角色
  setRoles(ctx, params) {
    ctx.dispatch('request', {
      url: `/user/setroles`,
      method: 'POST',
      body: {
        userIds: params.userIds,
        roleIds: params.roleIds
      },
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
// 修改密码
  resetPwd(ctx, params) {
    ctx.dispatch('request', {
      url: `/user/resetpsw`,
      method: 'POST',
      body: {
        userId: params.userId,
        password: params.password,
      },
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
 // 搜索用户用户名称筛选：http://qa.fortrun.cn:9201/user/getusersbyorgid/100000000000000160?name=唐启东
  searchUser(ctx, params) {
    ctx.dispatch('request', {
      url: `/user/getusersbyorgid/${params.orgid}?name=${params.name}`,
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
