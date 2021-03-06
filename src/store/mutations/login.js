module.exports = {
  getUserPermissions: (state, userPermissions) => {
    state.userPermissions = userPermissions
    localStorage.setItem('userPermissions', JSON.stringify(userPermissions))
  },
  getConfigPermissions: (state, configPermissions) => {
    state.configPermissions = configPermissions
    localStorage.setItem('configPermissions', JSON.stringify(configPermissions))
  },
  getUsernamePermissions: (state, usernamePermissions) => {
    state.usernamePermissions = usernamePermissions
    localStorage.setItem('usernamePermissions', JSON.stringify(usernamePermissions))
  },
  getPasswordPermissions: (state, passwordPermissions) => {
    state.passwordPermissions = passwordPermissions
    localStorage.setItem('passwordPermissions', JSON.stringify(passwordPermissions))
  },
  geteUserId: (state, eUserId) => {
    state.eUserId = eUserId
    localStorage.setItem('eUserId', JSON.stringify(eUserId))
  },

}
