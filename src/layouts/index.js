import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import { Navbar, Footer } from '../components'
import './index.css'

const Container = styled.div`
  h1,
  h2,
  h3,
  h4,
  p,
  a,
  label,
  button,
  input,
  select {
    font-family: 'futura';
  }
  h3,
  h4,
  p {
    font-weight: 100;
  }
  p {
    font-size: 0.9rem;
  }
  a {
    text-decoration: none;
  }
  img {
    border-radius: 9px;
  }
`
const windowGlobal = typeof window !== 'undefined' && window
class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: [],
      sidebar: false,
      styleFix: false,
      user: null,
    }
    this.handleSidebar = this.handleSidebar.bind(this)
    this.editItem = this.editItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.addItem = this.addItem.bind(this)
    this.clearCart = this.clearCart.bind(this)
  }
  static contextTypes = {
    firebase: PropTypes.object,
  }

  componentDidMount() {
    const cartData = JSON.parse(windowGlobal.localStorage.getItem('cart')) || []
    this.setState({ cart: cartData })

    const firebase = this.context.firebase
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.signIn(user)
      } else {
        this.signOut()
      }
    })
  }
  componentWillUnmount() {
    this.stopAuthListener()
  }
  signIn = user => {
    this.setState({ user: user })
  }
  signOut = () => {
    this.setState({ user: null })
  }

  handleSidebar() {
    this.setState({
      sidebar: !this.state.sidebar,
      styleFix: true,
    })
  }

  editItem(name, value, i) {
    let newCart = this.state.cart
    newCart[i][name] = value
    this.setState({
      cart: newCart,
    })
    windowGlobal.localStorage.setItem('cart', JSON.stringify(newCart))
  }
  removeItem(i) {
    let newCart = this.state.cart
    newCart.splice(i, 1)
    this.setState({
      cart: newCart,
    })
    windowGlobal.localStorage.setItem('cart', JSON.stringify(newCart))
  }
  addItem(title, price, quantity, image) {
    let newCart = this.state.cart
    newCart.push({ title, price, quantity, image })
    this.setState({
      cart: newCart,
      sidebar: true,
      styleFix: true,
    })
    windowGlobal.localStorage.setItem('cart', JSON.stringify(newCart))
  }
  clearCart() {
    this.setState({ cart: [] })
    windowGlobal.localStorage.setItem('cart', [])
  }
  render() {
    const { children, data } = this.props
    return (
      <Container>
        <Helmet
          title="Lipslut"
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <Navbar
          cart={this.state.cart}
          editItem={this.editItem}
          removeItem={this.removeItem}
          sidebar={this.state.sidebar}
          styleFix={this.state.styleFix}
          handleSidebar={this.handleSidebar}
          user={this.state.user}
        />
        <div
          style={{
            margin: '0 auto',
            maxWidth: 1260,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          {children({
            ...this.props,
            addItem: this.addItem,
            editItem: this.editItem,
            removeItem: this.removeItem,
            clearCart: this.clearCart,
            cart: this.state.cart,
            user: this.state.user,
          })}
        </div>
        <Footer />
      </Container>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
