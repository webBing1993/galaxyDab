/**
 * 小程序action
 */
module.exports = {
  getProdBaseList(ctx, param) {
    ctx.dispatch('resource', {
      url: `/productLine/getFunCodeItem`,
      method: 'GET',
      onSuccess: body => {
        // ctx.dispatch('showtoast', {text: '操作成功', type: 'success'});
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
}
