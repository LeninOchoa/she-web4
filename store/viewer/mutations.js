export default {
  setTrees(state, trees) {
    state.treeData = trees
  },

  setSearchfields(state, payload) {
    const fieldObject = {
      treeId: payload.tree,
      fields: payload.data,
    }
    state.treeFields.push(fieldObject)
  },

  setCurrentFields(state, payload) {
    state.currentFields = payload
  },
  setRootNodes(state, payload) {
    state.rootNodes = payload
  },
  setSearchParameter(state, payload) {
    state.searchParameter = payload
  },
}
