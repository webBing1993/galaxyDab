module.exports = {
  // 获取其他组织树
  otherTree(ctx, params) {
    ctx.dispatch('request', {
      url: `organization/other/getorgs`,
      method: 'get',
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
  // 添加其他组织
  addotherNode(ctx, params) {
    ctx.dispatch('request', {
      url: `/organization/other/add`,
      method: 'POST',
      body: {
        name: params.name,
        parentId: params.parentId,
      },
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: (body) => {
        params.onfail && params.onfail(body)
      }
    })
  },

  // 修改其他组织
  modifyother(ctx, params) {
    ctx.dispatch('request', {
      url: `/organization/other/update`,
      method: 'POST',
      body: {
        id: params.id,
        name: params.name,
        parentId: params.parentId,
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
