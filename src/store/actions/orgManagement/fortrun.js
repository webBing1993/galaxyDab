module.exports = {
  // 获取复创组织树
  fortrunTree(ctx, params) {
    ctx.dispatch('request', {
      url: `organization/fortrun`,
      method: 'get',
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
  // 添加复创组织
  addfortrunNode(ctx, params) {
    ctx.dispatch('request', {
      url: `organization/fortrun/add`,
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

  // 修改复创组织
  modifyFortrun(ctx, params) {
    ctx.dispatch('request', {
      url: `/organization/fortrun/update`,
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
