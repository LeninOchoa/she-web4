export async function searchRootNodes(params, token) {
  if (token === null) return

  const apiUrl =
    process.env.baseUrl + '/api/DocumentViewer/Search/' + params.treeId

  return await window.$nuxt
    .$axios({
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

      return nodes
    })
    .catch((error) => {
      return Promise.reject(error.response)
    })
}
