export default {
  setTrees(state, trees) {
    state.treeData = trees
  },

  setSearchfields(state, payload) {
    const fieldObject = {
      treeId: payload.tree,
      fileds: payload.data,
    }
    state.treeFields.push(fieldObject)
  },
}
