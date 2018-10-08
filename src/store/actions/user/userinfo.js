module.exports = {
  // 获取用户组织树
  UserManageTree(ctx, params) {
    ctx.dispatch('request', {
      url: `/org/getorgs`,
      method: 'get',
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
  // 根据组织机构id获取用户列表 url:/user/getusersbyorgid/{orgid}
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


  // 描述:删除
  delUser(ctx, params) {
    ctx.dispatch('request', {
      url: `/user/deleteusers`,
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
// 修改密码
  resetPwd(ctx, params) {
    ctx.dispatch('request', {
      url: `/user/resetpsw`,
      method: 'POST',
      body: {
        id: params.id,
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


}
