export default {
  isAutheticated(state) {
    return state.token != null
  },
  modules(state) {
    return state.modules
  },
  token(state) {
    let tCopy = state.token
    if (state.token === null) return null
    if (tCopy[0] === '"') {
      tCopy = tCopy.substring(1, tCopy.length - 1)
    }
    return tCopy
  },
}
