module.exports = {
  //搜索酒店详细列表
  searchUserListDetails(ctx, params) {
    ctx.dispatch('request', {
      url:`user/getorder?page=${params.page}&pageSize=${params.pagesize}`,
      method: 'post',
      body:{
        "name":params.name
      },
      headers: {
        "Content-Type":"application/json;charset=UTF-8"
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
