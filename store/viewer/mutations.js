export default {
  // Trees from Sys_Baum
  setTrees(state, trees) {
    state.trees = trees
  },
  setSearchfields(state, payload) {
    const fieldObject = {
      treeId: payload.tree,
      fields: payload.data,
    }
    state.searchFields.push(fieldObject)
  },
  setCurrentFields(state, payload) {
    state.selectedSearchFields = payload
  },
  setSearchParameter(state, payload) {
    state.searchParameter = payload
  },
  loadInViewer(state, payload) {
    state.images = payload
  },
}
