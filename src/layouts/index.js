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
`

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: [
        {
          title: 'F*ck-Trump',
          price: 19.95,
          quantity: 1,
          image:
            'https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/588c3f172e69cf76b74bf83d/5a1245a124a694409fb63065/1530824100181/website+tubes+web+copy.jpg',
        },
      ],
    }
    this.editItem = this.editItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.addItem = this.addItem.bind(this)
  }

  editItem(name, value, i) {
    let newCart = this.state.cart
    newCart[i][name] = value
    this.setState({
      cart: newCart,
    })
  }
  removeItem(i) {
    let newCart = this.state.cart
    newCart.splice(i, 1)
    this.setState({
      cart: newCart,
    })
  }
  addItem(title, price, quantity, image) {
    let newCart = this.state.cart
    newCart.push({ title, price, quantity, image })
    this.setState({
      cart: newCart,
    })
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
