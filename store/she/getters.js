export default {
  showDrawer(state) {
    return state.ShowDrawer
  },
  getFrauParameter(state) {
    return state.frauParameter
  },
  isFrau(state) {
    return state.frauParameter !== null
  },
}
