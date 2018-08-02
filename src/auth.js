import auth0 from 'auth0-js'
import { navigateTo } from 'gatsby-link'

const windowGlobal = typeof window !== 'undefined' && window
export default class Auth {
  constructor() {
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }
  componentDidMount() {
    auth0 = new auth0.WebAuth({
      domain: process.env.GATSBY_AUTH0_DOMAIN,
      clientID: process.env.GATSBY_AUTH0_CLIENT_ID,
      redirectUri: 'http://localhost:8000/callback',
      audience: `https://${process.env.GATSBY_AUTH0_DOMAIN}/api/v2/`,
      responseType: 'token id_token',
      scope: 'openid profile email',
    })
  }

  login() {
    this.auth0.authorize()
  }
  logout() {
    windowGlobal.localStorage.removeItem('access_token')
    windowGlobal.localStorage.removeItem('id_token')
    windowGlobal.localStorage.removeItem('expires_at')
    windowGlobal.localStorage.removeItem('user')
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
      } else if (err) {
        console.log(err)
      }

      // Return to the homepage after authentication.
      navigateTo('/')
      window.history.go(0)
    })
  }

  isAuthenticated() {
    const expiresAt = JSON.parse(
      windowGlobal.localStorage.getItem('expires_at')
    )
    return new Date().getTime() < expiresAt
  }

  setSession(authResult) {
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    windowGlobal.localStorage.setItem('access_token', authResult.accessToken)
    windowGlobal.localStorage.setItem('id_token', authResult.idToken)
    windowGlobal.localStorage.setItem('expires_at', expiresAt)

    this.auth0.client.userInfo(authResult.accessToken, (err, user) => {
      windowGlobal.localStorage.setItem('user', JSON.stringify(user))
    })
  }

  getUser() {
    if (windowGlobal.localStorage.getItem('user')) {
      return JSON.parse(windowGlobal.localStorage.getItem('user'))
    }
  }

  getUserName() {
    if (this.getUser()) {
      return this.getUser().name
    }
  }
}
