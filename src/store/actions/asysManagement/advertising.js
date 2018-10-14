
module.exports = {
  // 获取广告
  advertisinList (ctx, params) {
    ctx.dispatch('request', {
      url: `adv/queryAll/?name=${params.name}&type=${params.type}`,
      method: 'get',
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
  deleteAdver (ctx, params) {
    ctx.dispatch('request', {
      url: `adv/delete/${params.id}`,
      method: 'delete',
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  }
//   updateMsg (ctx, params) {
//     ctx.dispatch('request', {
//       url: `/adv/picture/upload`,
//       method: 'post',
//       onSuccess: (body) => {
//         params.onsuccess && params.onsuccess(body)
//       },
//       onFail: body => {
//         params.onfail && params.onfail(body)
//       }
//     })
//   }
}
