export default {
  getLicense(vuexContext) {
    const urlLicense = process.env.baseUrl + '/account/LicenceName'
    const urlHeaders = {
      Authorization: `Bearer ${vuexContext.rootState.auth.token}`,
    }

    return this.$axios({
      method: 'get',
      url: urlLicense,
      headers: urlHeaders,
    })
      .then((result) => {
        vuexContext.commit('setLicenseName', result.data)
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e)
      })
  },
}
