import React from 'react'
import PropTypes from 'prop-types'

class FirebaseProvider extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    firebase: PropTypes.object.isRequired,
  }

  static childContextTypes = {
    firebase: PropTypes.object,
  }

  getChildContext() {
    const { firebase } = this.props
    return {
      firebase,
    }
  }

  render() {
    const { children } = this.props

    return children
  }
}

export default FirebaseProvider
