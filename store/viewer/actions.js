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
        const nodes = []
        for (const data in result.data) {
          const temp = {
            ico: 'pat',
            name: result.data[data].Text,
            children: [],
            data: result.data[data],
            id: result.data[data].PKID[0],
            files: [],
            imageUrls: [],
          }
          /*
          vuexContext
            .dispatch('LoadLowerLayer', result.data[data].EbeneID)
            .then((lower) => {
              temp.layer = lower
            })
          */
          nodes.push(temp)
        }
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
      .then(async (result) => {
        const rest = result.data.map((x) => {
          if (x.ElektronischerStatusID === 2) {
            return { ...x, ico: 'auf' }
          } else if (x.ElektronischerStatusID === 4) {
            return { ...x, ico: 'rest' }
          } else if (x.ElektronischerStatusID === 1) {
            return { ...x, ico: 'rest' }
          } else if (x.ElektronischerStatusID === 100) {
            return { ...x, ico: 'allg' }
          } else {
            return { ...x, ico: 'rest' }
          }
        })
        let files = []
        const nodes = []
        for (const index in rest) {
          if (rest[index].Files !== null) {
            files = [...files, ...rest[index].Files]
            continue
          }
          const temp = {
            ico: rest[index].ico,
            name: rest[index].Text,
            children: [],
            data: rest[index],
            id: rest[index].PKID[0],
            files: [],
            imageUrls: [],
          }
          nodes.push(temp)
        }

        vuexContext.commit('AddFilesToNode', {
          node: parameter.parentNode,
          files,
        })
        if (files.length > 0) {
          const image = []
          for (const file in files) {
            const par = {
              serverpath: files[file],
              size: 150,
            }
            await vuexContext
              .dispatch('getImageBinary', par)
              .then((result) => {
                const imageUrl = URL.createObjectURL(result)
                image.push(imageUrl)
              })
              // eslint-disable-next-line no-console
              .catch((e) => console.log('error', e))
          }
          vuexContext.commit('AddImageUrlsToNode', {
            node: parameter.parentNode,
            imageUrls: image,
          })
        }

        return nodes
      })
      .catch((error) => {
        return Promise.reject(error.response)
      })
  },
  /*
  async LoadLowerLayer(vuexContext, ebeneId) {
    if (vuexContext.state.lowerLayer[ebeneId] !== undefined) {
      return vuexContext.state.lowerLayer[ebeneId]
    }
    const apiUrl =
      process.env.baseUrl + '/api/DocumentViewer/GetLowerLayer/' + ebeneId
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
        vuexContext.commit('AddLowerLayer', {
          ebeneID: ebeneId,
          layer: result.data,
        })
        return result.data
      })
      .catch((error) => {
        return Promise.reject(error.response)
      })
  },
*/
  async GetNodeData(vuexContext, parameter) {
    const apiUrl =
      process.env.baseUrl +
      '/api/DocumentViewer/GetNodeData/' +
      parameter.ebeneId

    const token = vuexContext.rootGetters['auth/token']
    if (token === null) return

    return await this.$axios({
      method: 'post',
      url: apiUrl,
      data: parameter.pkids,
      headers: {
        authorization: `Bearer  ${token}`,
        'If-Modified-Since': 'Mon, 26 Jul 1997 05:00:00 GMT',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: 'Sat, 01 Jan 2000 00:00:00 GMT',
      },
    })
      .then((result) => {
        return result.data
      })
      .catch((error) => {
        return Promise.reject(error.response)
      })
  },
  async getImageBinary(vuexContext, parameter) {
    const apiUrl =
      process.env.baseUrl +
      `/api/DocumentViewer/LoadImageBinary?id=${btoa(
        parameter.serverpath
      )}&size=${parameter.size}`

    const token = vuexContext.rootGetters['auth/token']
    if (token === null) return

    return await this.$axios({
      responseType: 'blob',
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
        return result.data
      })
      .catch((error) => {
        return Promise.reject(error.response)
      })
  },
}
