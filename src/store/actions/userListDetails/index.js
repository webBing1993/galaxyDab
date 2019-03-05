module.exports = {
  //搜索酒店详细列表
  searchUserListDetails(ctx, params) {
    ctx.dispatch('request', {
      url: `user/orderId/getall`,
      method: 'post',
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
}
