module.exports = {
  getUserPermissions: (state, userPermissions) => {
    state.userPermissions = userPermissions
    localStorage.setItem('userPermissions', JSON.stringify(userPermissions))
  },
  getConfigPermissions: (state, configPermissions) => {
    state.configPermissions = configPermissions
    localStorage.setItem('configPermissions', JSON.stringify(configPermissions))
  },

}
