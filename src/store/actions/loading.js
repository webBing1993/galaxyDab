module.exports = {
  showLoading(ctx,param){
    ctx.commit('LOADING',param)
    console.log('LOADING',param)
  },

}
