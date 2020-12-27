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
          parent: null,
          Information: null,
        }
        nodes.push(temp)
      }

      return nodes
    })
    .catch((error) => {
      return Promise.reject(error.response)
    })
}

export async function loadChildren(parameter, token) {
  if (token === null) return

  const apiUrl =
    process.env.baseUrl + '/api/DocumentViewer/LoadChildren/' + parameter.treeId
  const items = {
    ParentNode: parameter.ParentNode,
    Sfs: parameter.Sfs,
  }
  return await window.$nuxt
    .$axios({
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
          files = [...new Set([...files, ...rest[index].Files])]
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
          parent: parameter.ParentNode.parent,
          Information: null,
        }
        nodes.push(temp)
      }

      const images = []
      if (files.length > 0) {
        for (const file in files) {
          const par = {
            serverpath: files[file],
            size: 0,
          }

          await getImageBinary(par, token)
            .then((result) => {
              const imageUrl = URL.createObjectURL(result)
              images.push(imageUrl)
            })
            // eslint-disable-next-line no-console
            .catch((e) => console.log('error', e))
        }
      }

      return { nodes, files, images }
    })
    .catch((error) => {
      console.log('loadChildren', error)
      return Promise.reject(error.response)
    })
}

export async function getImageBinary(parameter, token) {
  if (token === null) return

  const apiUrl =
    process.env.baseUrl +
    `/api/DocumentViewer/LoadImageBinary?id=${btoa(
      parameter.serverpath
    )}&size=${parameter.size}`

  return await window.$nuxt
    .$axios({
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
}

export async function GetInformation(parameter, token) {
  if (token === null) return
  // console.log('GetInformation', parameter)
  const apiUrl = process.env.baseUrl + '/api/DocumentViewer/GetInformation/'

  return await window.$nuxt
    .$axios({
      method: 'post',
      url: apiUrl,
      data: parameter,
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
}
