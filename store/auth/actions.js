import Cookies from 'js-cookie'

export default {
  async authenticateUser(vuexContext, authData) {
    const authUrl = process.env.baseUrl + '/token'
    const body = `grant_type=password&username=${authData.login}&password=${authData.password}&scope=viewer`
    return await this.$axios({
      method: 'post',
      url: authUrl,
      data: body,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then((result) => {
        vuexContext.commit('setToken', result.data.access_token)
        localStorage.setItem('token', result.data.access_token)
        localStorage.setItem(
          'tokenExpiration',
          new Date().getTime() + Number.parseInt(result.data.expiresIn) * 1000
        )
        Cookies.set('jwt', result.data.access_token)
        Cookies.set(
          'expirationDate',
          new Date().getTime() + Number.parseInt(result.data.expiresIn) * 1000
        )
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e)
      })
  },
  setLogoutTimer(vuexContext, duration) {
    setTimeout(() => {
      vuexContext.commit('clearToken')
    }, duration)
  },
  initAuth(vuexContext, req) {
    let token
    let expirationDate

    if (req) {
      if (!req.headers.cookie) {
        return
      }
      const jwtCookie = req.headers.cookie
        .split(';')
        .find((c) => c.trim().startsWith('jwt='))
      if (!jwtCookie) {
        return
      }
      token = jwtCookie.split('=')[1]
      expirationDate = req.headers.cookie
        .split(';')
        .find((c) => c.trim().startsWith('expirationDate='))
        .split('=')[1]
    } else {
      token = localStorage.getItem('token')
      expirationDate = localStorage.getItem('tokenExpiration')
    }
    if (new Date().getTime() > +expirationDate || !token) {
      // eslint-disable-next-line no-console
      console.log('No token or invalid token')
      vuexContext.dispatch('logout')
      return
    }
    vuexContext.commit('setToken', token)
  },
  logout(vuexContext) {
    vuexContext.commit('clearToken')
    Cookies.remove('jwt')
    Cookies.remove('expirationDate')
    if (process.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('tokenExpiration')
    }
  },
}
