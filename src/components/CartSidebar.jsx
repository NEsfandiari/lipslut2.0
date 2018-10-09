import React, { Component } from 'react'
import styled from 'styled-components'
import { FaClose } from 'react-icons/lib/fa'
import { LinkButton, StyledHr } from './atoms'
import { SidebarItem } from './molecules'
import axios from 'axios'
import 'animate.css'
import { navigateTo } from 'gatsby-link'

const Container = styled.div`
  display: ${({ displayFix }) => displayFix || 'none'};
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2;
  flex-direction: column;
  align-items: center;
  width: 23rem;
  height: 100%;
  background-color: #f9f7f1;
  overflow: auto;
  padding-bottom: 1rem;
  p {
    text-align: center;
  }
  h1 {
    margin: 0;
  }
  .contents {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .header {
    display: flex;
    width: 90%;
    margin-top: 1rem;
    margin-bottom: 2rem;
    svg {
      margin-right: 6rem;
      cursor: pointer;
    }
    svg:hover {
      color: dimgray;
    }
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
    const { cart, removeItem } = this.props
    const animation =
      'animated ' + (this.props.display ? 'slideInRight' : 'slideOutRight')
    const displayFix = this.props.displayFix ? 'inital' : 'none'
    const items = cart.map((item, i) => (
      <SidebarItem
        item={item}
        handleAdjust={this.handleAdjust}
        removeItem={removeItem}
        id={i}
        key={i}
      />
    ))
    const subtotal = this.props.cart
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price * currentValue.quantity
      }, 0)
      .toFixed(2)
    const buttonUsability = this.props.cart.length == 0 ? '' : ''
    const opacity = this.props.cart.length == 0 ? 0.3 : 1
    return (
      <Container className={animation} displayFix={displayFix}>
        <div className="contents">
          <div className="header">
            <div>
              <FaClose onClick={this.props.handleSidebar} size={'2rem'} />
            </div>
            <h1>Items</h1>
          </div>
          {cart.length > 0 ? items : <p>Add Items to Checkout!</p>}
          <StyledHr />
          <h4>Subtotal: ${subtotal}</h4>
          <LinkButton
            onClick={this.handleCheckout}
            style={{ opacity: opacity }}
          >
            CHECKOUT
          </LinkButton>
        </div>
      </Container>
    )
  }
}

export default CartSidebar
