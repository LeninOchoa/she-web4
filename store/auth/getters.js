export default {
  isAutheticated(state) {
    return state.token != null
  },
  modules(state) {
    return state.modules
  },
}
