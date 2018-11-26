import React, { Component } from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import { Navbar, Footer } from '../components'
import postLambda from '../utilities/postLambda'
import Cart from '../utilities/cart'
import { CartProvider } from '../containers/CartContext'
import FirebaseProvider from '../containers/FirebaseProvider'
import firebase from '../utilities/firebase'
// import { UserProvider } from '../containers/UserContext'
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1260px;
    padding: 0px 1.0875rem;

    @media (max-width: 420px) {
      max-width: 100vw;
      padding-left: 1rem;
      padding-right: 1rem;
      margin: auto;
    }
  }
`
// Gatsby window object problem hack
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

  componentDidMount() {
    // TODO: Create Context for the current User Information
    let cartData = windowGlobal.localStorage.getItem('cart') || '[]'
    cartData = JSON.parse(cartData)
    this.setState({ cart: cartData })

    firebase.auth().onAuthStateChanged(user => {
      if (user && !this.state.curUser) {
        debugger
        // Commented out due to broken code
        // this.signIn(user)
      } else {
        this.setState({ curUser: null })
      }
    })
  }

  // Firebase Functionality
  signIn = user => {
    // TODO: Seperate database schema into more react friendly schema
    debugger
    firebase
      .signIn(user.uid)
      .then(curUser => {
        curUser = curUser.data()
        debugger
        postLambda('getAccount', curUser).then(res => {
          curUser['orderHistory'] = res.data.customer.orders
          this.setState({ curUser })
          debugger
        })
      })
      .catch(err => {
        console.log(err)
      })
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
  handleBannerMargin = rem => {
    this.setState({ bannerMargin: rem })
  }

  handleCart = (cartFunc, ...args) => {
    switch (cartFunc) {
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
    const { children } = this.props
    // TODO: Remove this pattern and convert out of a gatsby v1 magic layout
    // Cannot Pass Props down to children in Gatsby v2 with gatsby v1 magic Layout, Need this Hack for now
    const childrenWithProps = React.Children.map(children, (child, i) =>
      React.cloneElement(child, {
        ...this.props,
        curUser: this.state.curUser,
        resetSidebar: this.resetSidebar,
        signIn: this.signIn,
      })
    )

    return (
      <FirebaseProvider firebase={firebase}>
        <CartProvider
          value={{
            cart: this.state.cart,
            handleCart: this.handleCart,
          }}
        >
          <Container>
            <Helmet
              title="Lipslut"
              // TODO: Fill this out with accurate site metadata for google
              meta={[
                { name: 'description', content: 'Sample' },
                { name: 'keywords', content: 'sample, something' },
              ]}
            />
            <Navbar
              curUser={this.state.curUser}
              sidebar={this.state.sidebar}
              displayFix={this.state.displayFix}
              handleSidebar={this.handleSidebar}
              handleBannerMargin={this.handleBannerMargin}
            />
            <div
              className="all-components-layout"
              style={{ marginTop: this.state.bannerMargin + 'rem' }}
            >
              {childrenWithProps}
            </div>
            <Footer />
          </Container>
        </CartProvider>
      </FirebaseProvider>
    )
  }
}

export default Layout
