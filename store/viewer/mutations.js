export default {
  setTrees(state, trees) {
    state.trees = trees
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
  setSearchParameter(state, payload) {
    state.searchParameter = payload
  },
  loadInViewer(state, payload) {
    state.images = payload
  },
  setTree(state, payload) {
    state.tree = payload
  },
  addChildren(state, payload) {
    const tree = state.tree

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

    state.tree = tree
  },
  AddFilesToNode(state, payload) {
    const tree = state.tree

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

    state.tree = tree
  },

  AddImageUrlsToNode(state, payload) {
    const tree = state.tree

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

    state.tree = tree
  },
}
