module.exports = {
  loginIN(ctx, params){
    ctx.dispatch('request', {
      url: '/login',
      method:'POST',
      body: {
        account: params.account,
        password: params.password
      },
      onSuccess: (body) => {
        sessionStorage.setItem('session_id', body.data.session_id)
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
}
