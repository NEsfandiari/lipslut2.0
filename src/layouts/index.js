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

class Layout extends Component {
  constructor(props) {
    super(props)
    const cartData = JSON.parse(localStorage.getItem('cart')) || []
    this.state = {
      cart: cartData,
      sidebar: false,
      styleFix: false,
    }
    this.handleSidebar = this.handleSidebar.bind(this)
    this.editItem = this.editItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.addItem = this.addItem.bind(this)
    this.clearCart = this.clearCart.bind(this)
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
    localStorage.setItem('cart', JSON.stringify(newCart))
  }
  removeItem(i) {
    let newCart = this.state.cart
    newCart.splice(i, 1)
    this.setState({
      cart: newCart,
    })
    localStorage.setItem('cart', JSON.stringify(newCart))
  }
  addItem(title, price, quantity, image) {
    let newCart = this.state.cart
    newCart.push({ title, price, quantity, image })
    this.setState({
      cart: newCart,
      sidebar: true,
      styleFix: true,
    })
    localStorage.setItem('cart', JSON.stringify(newCart))
  }
  clearCart() {
    this.setState({ cart: [] })
    localStorage.setItem('cart', [])
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
