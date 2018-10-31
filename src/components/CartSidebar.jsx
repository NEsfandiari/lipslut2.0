import React, { Component } from 'react'
import styled from 'styled-components'
import { IoIosCloseEmpty } from 'react-icons/lib/io'
import { LinkButton, StyledHr, ShoppingBagIcon } from './atoms'
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
  .items {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    hr {
      width: 250%;
    }
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin-top: 1rem;
    margin-bottom: 2rem;
    svg {
      cursor: pointer;
    }
    h3 {
      margin: 0;
    }
    #bag {
      cursor: default;
    }
    svg:hover {
      color: dimgray;
    }
  }
  .footer {
    display: flex;
    flex-direction: column;
    width: 80%
    justify-content: space-between;
    align-items: center;
    p {
      font-size: 0.7rem;
      text-align: left;
      line-height: 1rem;
      margin-top: .5rem;
    }
  }
  .subtotal{
      display: flex;
      justify-content: space-between;
      width: 100%;
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
    const items = cart.map((item, i) => (
      <SidebarItem
        item={item}
        handleAdjust={this.handleAdjust}
        removeItem={removeItem}
        id={i}
        key={i}
      />
    ))
    const subtotal = cart
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price * currentValue.quantity
      }, 0)
      .toFixed(2)
    const buttonUsability = cart.length == 0 ? '' : window.location.pathname
    const opacity = cart.length == 0 ? 0.3 : 1
    return (
      <Container className={animation} displayFix={displayFix}>
        <div className="contents">
          <div className="header">
            <IoIosCloseEmpty
              onClick={handleSidebar}
              size={'2rem'}
              class="close"
            />
            <h3>Your Bag</h3>
            <ShoppingBagIcon id="bag" cart={cart} click={handleSidebar} />
          </div>
          <div className="items">
            {cart.length > 0 ? (
              items
            ) : (
              <p>
                nothing here.....yet<br />shop now!
              </p>
            )}
            <StyledHr />
          </div>
          <div className="footer">
            <div className="subtotal">
              <h4>Subtotal:</h4>
              <h4>${subtotal}</h4>
            </div>
            <LinkButton
              to={buttonUsability}
              onClick={this.handleCheckout}
              style={{ opacity: opacity }}
            >
              CHECKOUT
            </LinkButton>
            <p>
              By checking out, I agree to the Terms of Use and acknowledge that
              I have read the Privacy Policy Shipping and promotions calculated
              in checkout.
            </p>
          </div>
        </div>
      </Container>
    )
  }
}

export default CartSidebar
