import React, { Component } from 'react'
import Auth from '../auth'

class Callback extends Component {
  render() {
    const auth = new Auth()
    auth.handleAuthentication()
    return <div>Loading...</div>
  }
}

export default Callback
