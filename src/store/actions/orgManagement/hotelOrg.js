module.exports = {
  // 获取酒店组织树
  hotelOrgTree(ctx, params) {
    ctx.dispatch('request', {
      url: `https://intg.fortrun.cn/virgo/org/getorgs`,
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
