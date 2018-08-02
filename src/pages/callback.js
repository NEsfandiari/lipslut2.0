import React, { Component } from 'react'
import Auth from '../auth'

class Callback extends Component {
  componentDidMount() {
    const auth = new Auth()
    auth.handleAuthentication()
  }
  render() {
    return <div>Loading...</div>
  }
}

export default Callback
