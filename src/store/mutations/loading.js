module.exports = {
  LOADING(state,payload) {
    state.loadingStatus = payload
    console.log('loadingStatus:', payload)
  }
}
