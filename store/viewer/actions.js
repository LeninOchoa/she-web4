export default {
  async getTreeData(vuexContext) {
    const urlLicense = process.env.baseUrl + '/api/DocumentViewer/GetBaumData'
    const token = vuexContext.rootGetters['auth/token']
    if (token === null) return

    return await this.$axios({
      method: 'get',
      url: urlLicense,
      headers: {
        authorization: `Bearer  ${token}`,
        'If-Modified-Since': 'Mon, 26 Jul 1997 05:00:00 GMT',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: 'Sat, 01 Jan 2000 00:00:00 GMT',
      },
    })
      .then((result) => {
        vuexContext.commit('setTrees', result.data)
        return result.data
      })
      .catch((error) => {
        return Promise.reject(error.response)
      })
  },
  async searchNodes(vuexContext, params) {
    const apiUrl =
      process.env.baseUrl + '/api/DocumentViewer/Search/' + params.treeId

    const token = vuexContext.rootGetters['auth/token']
    if (token === null) return

    return await this.$axios({
      method: 'post',
      url: apiUrl,
      data: params.data,
      headers: {
        authorization: `Bearer  ${token}`,
        'If-Modified-Since': 'Mon, 26 Jul 1997 05:00:00 GMT',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: 'Sat, 01 Jan 2000 00:00:00 GMT',
      },
    })
      .then((result) => {
        /*
        const ico = result.data.map((obj) => ({ ...obj, ico: 'pat' }))
        const name = ico.map((obj) => ({ ...obj, name: obj.Text }))
        const rest = name.map((obj) => ({ ...obj, children: [] }))
        */
        const rest = JSON.parse(JSON.stringify(result.data))
        const nodes = []
        for (const data in rest) {
          const temp = {
            ico: 'pat',
            name: rest[data].Text,
            children: [],
            data: rest[data],
          }
          nodes.push(temp)
        }
        console.log('searchNodes', nodes)
        vuexContext.commit('setRootNodes', nodes)
        vuexContext.commit('setSearchParameter', params)
        return nodes
      })
      .catch((error) => {
        return Promise.reject(error.response)
      })
  },
  async getTreeFields(vuexContext, treeId) {
    const apiUrl =
      process.env.baseUrl + '/api/DocumentViewer/GetSearchFields/' + treeId

    const token = vuexContext.rootGetters['auth/token']
    if (token === null) return

    return await this.$axios({
      method: 'get',
      url: apiUrl,
      headers: {
        authorization: `Bearer  ${token}`,
        'If-Modified-Since': 'Mon, 26 Jul 1997 05:00:00 GMT',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: 'Sat, 01 Jan 2000 00:00:00 GMT',
      },
    })
      .then((result) => {
        vuexContext.commit('setSearchfields', {
          tree: treeId,
          data: result.data,
        })
        vuexContext.commit('setCurrentFields', result.data)
        return {
          tree: treeId,
          data: result.data,
        }
      })
      .catch((error) => {
        return Promise.reject(error.response)
      })
  },

  async LoadChildren(vuexContext, parameter) {
    const apiUrl =
      process.env.baseUrl +
      '/api/DocumentViewer/LoadChildren/' +
      parameter.treeId

    const token = vuexContext.rootGetters['auth/token']
    if (token === null) return

    const items = {
      ParentNode: parameter.ParentNode,
      Sfs: parameter.Sfs,
    }
    return await this.$axios({
      method: 'post',
      url: apiUrl,
      data: items,
      headers: {
        authorization: `Bearer  ${token}`,
        'If-Modified-Since': 'Mon, 26 Jul 1997 05:00:00 GMT',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: 'Sat, 01 Jan 2000 00:00:00 GMT',
      },
    })
      .then((result) => {
        const neWd = result.data.map((x) => {
          if (x.ElektronischerStatusID === 2) {
            return { ...x, ico: 'auf' }
          } else {
            return { ...x, ico: 'pat' }
          }
        })
        const rest = JSON.parse(JSON.stringify(neWd))
        const nodes = []
        for (const data in rest) {
          const temp = {
            ico: rest[data].ico,
            name: rest[data].Text,
            children: [],
            data: rest[data],
          }
          nodes.push(temp)
        }
        // eslint-disable-next-line no-console
        console.log('LoadChildren', nodes)
        return nodes
      })
      .catch((error) => {
        return Promise.reject(error.response)
      })
  },
}
