import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Navbar, Footer } from '../components'
import postLambda from '../utilities/postLambda'
import Cart from '../utilities/cart'
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
    border-radius: 3px;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .all-components-layout {
    max-width: 1260px;
    padding: 0px 1.0875rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (max-width: 420px) {
      max-width: 100vw;
      padding-left: 1rem;
      padding-right: 1rem;
      margin: auto;
    }
  }
`
// Gatsby v 1.91 window object problem hack
const windowGlobal = typeof window !== 'undefined' && window

class Layout extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      cart: [],
      curUser: null,
      sidebar: false,
      displayFix: false,
      bannerMargin: 5.9,
    }
  }

  static contextTypes = {
    firebase: PropTypes.object,
  }

  componentDidMount() {
    // TODO: Create Context for the current User Information
    let cartData = windowGlobal.localStorage.getItem('cart') || '[]'
    cartData = JSON.parse(cartData)
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

  // Firebase Functionality
  signIn = user => {
    // TODO: Seperate database schema into more react friendly schema
    const { firebase } = this.context
    firebase
      .signIn(user.uid)
      .then(curUser => {
        curUser = curUser.data()
        postLambda('getAccount', curUser).then(res => {
          curUser['orderHistory'] = res.data.customer.orders
          this.setState({ curUser })
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  signOut = () => {
    this.setState({ curUser: null })
  }

  // Sidebar/Banner UI Logic
  handleSidebar = () => {
    this.setState({
      sidebar: !this.state.sidebar,
      displayFix: true,
    })
  }
  resetSidebar = () => {
    this.setState({ sidebar: false })
  }
  handleBannerMargin = (rem) => {
    this.setState({ bannerMargin: rem })
  }

  handleCart = (cartFunc, ...args) =>{
    switch(cartFunc){
      case 'add':
        Cart.addItem(this, ...args)
        break
      case 'edit':
        Cart.editItem(this, ...args)
        break
      case 'remove':
        Cart.removeItem(this, ...args)
        break
      case 'clear':
        Cart.clearCart(this)
        break
      default:
        console.error('incorrect usage')
        break
    }
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
          curUser={this.state.curUser}
          cart={this.state.cart}
          handleCart={this.handleCart}
          sidebar={this.state.sidebar}
          displayFix={this.state.displayFix}
          handleSidebar={this.handleSidebar}
          handleBannerMargin={this.handleBannerMargin}
        />
        <div
          className="all-components-layout"
          style={{ marginTop: this.state.bannerMargin + 'rem' }}
        >
          {children({
            ...this.props,
            handleCart: this.handleCart,
            cart: this.state.cart,
            curUser: this.state.curUser,
            resetSidebar: this.resetSidebar,
            signIn: this.signIn,
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
