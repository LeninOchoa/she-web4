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
  setTree(state, payload) {
    state.searchedTree = payload
  },
  addChildren(state, payload) {
    const tree = state.searchedTree

    function makeUpdate(a, u, t) {
      return (
        Array.isArray(a) &&
        a.some(function (b, i, bb) {
          if (b.id === t) {
            b.children = u
            return true
          }
          return makeUpdate(b.children, u, t)
        })
      )
    }
    makeUpdate(tree, payload.children, payload.parent.id)

    state.searchedTree = tree
  },
  AddFilesToNode(state, payload) {
    const tree = state.searchedTree

    function makeUpdate(a, u, t) {
      return (
        Array.isArray(a) &&
        a.some(function (b, i, bb) {
          if (b.id === t) {
            b.files = u
            return true
          }
          return makeUpdate(b.children, u, t)
        })
      )
    }
    makeUpdate(tree, payload.files, payload.node.id)

    state.searchedTree = tree
  },

  AddImageUrlsToNode(state, payload) {
    const tree = state.searchedTree

    function makeUpdate(a, u, t) {
      return (
        Array.isArray(a) &&
        a.some(function (b, i, bb) {
          if (b.id === t) {
            b.imageUrls = u
            return true
          }
          return makeUpdate(b.children, u, t)
        })
      )
    }
    makeUpdate(tree, payload.imageUrls, payload.node.id)

    state.searchedTree = tree
  },
}
