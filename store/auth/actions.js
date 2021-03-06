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
        const expiredIn = Number.parseInt(result.data.expires_in) * 1000
        vuexContext.commit('setToken', result.data.access_token)
        localStorage.setItem('token', result.data.access_token)
        localStorage.setItem(
          'tokenExpiration',
          new Date().getTime() + expiredIn
        )
        Cookies.set('jwt', result.data.access_token)
        Cookies.set('expirationDate', new Date().getTime() + expiredIn)

        vuexContext.commit('she/leftTimeSessionCounter', expiredIn, {
          root: true,
        })
        vuexContext.commit('she/showSessionCounter', true, {
          root: true,
        })
        return true
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e)
        return Promise.reject(e)
      })
  },
  setLogoutTimer(vuexContext, duration) {
    setTimeout(async () => {
      await vuexContext.dispatch('logout')
      window.onNuxtReady(() => {
        window.$nuxt.$router.push('/')
      })
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
  async logout(vuexContext) {
    const token = vuexContext.rootGetters['auth/token']
    vuexContext.commit('clearToken')
    Cookies.remove('jwt')
    Cookies.remove('expirationDate')
    vuexContext.commit('she/setFrauParameter', null, { root: true })
    if (process.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('tokenExpiration')
      if (token === null) return
      const logoutUrl = process.env.baseUrl + '/api/account/logout'

      vuexContext.commit('she/showSessionCounter', false, {
        root: true,
      })

      vuexContext.commit('she/leftTimeSessionCounter', 0, {
        root: true,
      })
      return await this.$axios({
        method: 'get',
        url: logoutUrl,
        headers: {
          authorization: `Bearer  ${token}`,
          'If-Modified-Since': 'Mon, 26 Jul 1997 05:00:00 GMT',
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Expires: 'Sat, 01 Jan 2000 00:00:00 GMT',
        },
      })
        .then((result) => {})
        .catch((error) => {
          return Promise.reject(error.response)
        })
    }
  },
}
