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
}
