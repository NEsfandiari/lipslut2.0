import React, { Component } from 'react'
import styled from 'styled-components'
import { CartSidebarBody, CartSidebarFooter } from './molecules'
import CartSidebarHeader from './molecules/CartSIdebarHeader.jsx'
import axios from 'axios'
import 'animate.css'
import { navigateTo } from 'gatsby-link'
const Container = styled.div`
  display: ${({ displayFix }) => displayFix || 'none'};
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2;
  width: 23rem;
  height: 100%;
  background-color: #e4f1f4;
  p {
    text-align: center;
  }
  .contents {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    overflow: auto;
  }
  @media (max-width: 420px) {
    width: 100%;
  }
`

class CartSidebar extends Component {
  handleAdjust = e => {
    let i = parseInt(e.target.dataset.id)
    if (e.target.className == 'add') {
      let newVal = this.props.cart[i].quantity + 1
      this.props.editItem('quantity', newVal, i)
    } else {
      let newVal = this.props.cart[i].quantity - 1
      newVal < 1 ? (newVal = 1) : newVal
      this.props.editItem('quantity', newVal, i)
    }
  }

  handleCheckout = e => {
    this.props.handleSidebar()
    const items = this.props.cart.map(item => {
      return {
        variantId: item.sku,
        quantity: item.quantity,
      }
    })
    axios
      .post(
        location.hostname === 'localhost'
          ? 'http://localhost:9000/createCheckout'
          : `${process.env.GATSBY_LAMBDA_ENDPOINT}createCheckout`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items,
          }),
        }
      )
      .then(res => {
        window.location.replace(
          res.data.data.data.checkoutCreate.checkout.webUrl
        )
        this.props.clearCart()
      })
  }
  render() {
    const { cart, removeItem, handleSidebar, display } = this.props
    const animation = 'animated ' + (display ? 'slideInRight' : 'slideOutRight')
    const displayFix = this.props.displayFix ? 'inital' : 'none'
    return (
      <Container className={animation} displayFix={displayFix}>
        <div className="contents">
          <CartSidebarHeader cart={cart} handleSidebar={handleSidebar} />
          <CartSidebarBody
            cart={cart}
            removeItem={removeItem}
            handleAdjust={this.handleAdjust}
          />
          <CartSidebarFooter cart={cart} handleCheckout={this.handleCheckout} />
        </div>
      </Container>
    )
  }
}

export default CartSidebar
