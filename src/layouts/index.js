import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Navbar, Footer } from '../components'
import './index.css'
import postLambda from '../utilities/postLambda'

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
`
const windowGlobal = typeof window !== 'undefined' && window
class Layout extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      cart: [],
      sidebar: false,
      displayFix: false,
      curUser: null,
      rem: 5.9,
    }
    this.handleSidebar = this.handleSidebar.bind(this)
    this.editItem = this.editItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.addItem = this.addItem.bind(this)
    this.clearCart = this.clearCart.bind(this)
    this.resetSidebar = this.resetSidebar.bind(this)
    this.marginSet = this.marginSet.bind(this)
  }

  static contextTypes = {
    firebase: PropTypes.object,
  }

  componentDidMount() {
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

  signIn = user => {
    // TODO: Seperate database schema into more react friendly schema
    const { firebase } = this.context
    firebase
      .signIn(user.uid)
      .then(curUser => {
        curUser = curUser.data()
        postLambda('getAccount', curUser).then(res => {
          debugger
          if (res.data.customer) curUser = res.data.customer
        })
        this.setState({ curUser: curUser })
      })
      .catch(err => {
        console.log(err)
      })
  }

  signOut = () => {
    this.setState({ curUser: null })
  }

  handleSidebar() {
    this.setState({
      sidebar: !this.state.sidebar,
      displayFix: true,
    })
  }

  resetSidebar() {
    this.setState({ sidebar: false })
  }

  marginSet(rem) {
    this.setState({ rem })
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
  addItem(title, price, quantity, image, sku) {
    let newCart = this.state.cart
    // test if sku is in cart
    let cartI = null
    this.state.cart.forEach((item, i) => {
      item.sku == sku ? (cartI = i) : (cartI = null)
    })
    cartI !== null
      ? newCart[cartI].quantity++
      : newCart.push({ title, price, quantity, image, sku })

    this.setState({
      cart: newCart,
      sidebar: true,
      displayFix: true,
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
        <div
          style={{
            margin: '0 auto',
            maxWidth: 1260,
            padding: '0px 1.0875rem',
            paddingTop: 0,
          }}
        >
          <Navbar
            cart={this.state.cart}
            editItem={this.editItem}
            removeItem={this.removeItem}
            sidebar={this.state.sidebar}
            displayFix={this.state.displayFix}
            handleSidebar={this.handleSidebar}
            curUser={this.state.curUser}
            clearCart={this.clearCart}
            marginSet={this.marginSet}
          />
          <div
            style={{
              position: 'relative',
              marginTop: this.state.rem + 'rem',
            }}
          >
            {children({
              ...this.props,
              addItem: this.addItem,
              editItem: this.editItem,
              removeItem: this.removeItem,
              clearCart: this.clearCart,
              cart: this.state.cart,
              curUser: this.state.curUser,
              resetSidebar: this.resetSidebar,
              signIn: this.signIn,
            })}
            <Footer />
          </div>
        </div>
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
