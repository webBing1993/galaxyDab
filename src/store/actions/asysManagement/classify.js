module.exports = {
  // 获取分类列表
  claList(ctx, params) {
    ctx.dispatch('request', {
      url: `/discoveryCatalog/page/${params.page}`,
      body: {
        pageSize: params.pageSize,
        name: params.name
      },
      method: 'post',
      headers: {
        'Content-Type':'multipart/form-data'
      },
      onSuccess: (body, headers) => {
        params.onsuccess ? params.onsuccess(body, headers) : null
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
}
