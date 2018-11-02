import React, { Component } from 'react'
import styled from 'styled-components'
import { LinkButton, StyledHr } from '../atoms'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%
    justify-content: space-between;
    align-items: center;
    .disclaimer{
      font-size: 0.7rem;
      text-align: left;
      line-height: 1rem;
      margin-top: .5rem;
    }
    .subtotal{
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    hr {
    width: 150%;
  }
`

class CartSidebarFooter extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { cart, handleCheckout } = this.props
    const subtotal = cart
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price * currentValue.quantity
      }, 0)
      .toFixed(2)
    const buttonUsability = cart.length == 0 ? '' : window.location.pathname
    const opacity = cart.length == 0 ? 0.3 : 1
    return (
      <Container>
        <StyledHr />
        <div className="subtotal">
          <h4>Subtotal:</h4>
          <h4>${subtotal}</h4>
        </div>
        <LinkButton
          to={buttonUsability}
          onClick={handleCheckout}
          style={{ opacity: opacity }}
          height={'3rem'}
          width={'18.5rem'}
          lineHeight={'2.85rem'}
        >
          CHECKOUT
        </LinkButton>
        <p className="disclaimer">
          By checking out, I agree to the Terms of Use and acknowledge that I
          have read the Privacy Policy Shipping and promotions calculated in
          checkout.
        </p>
      </Container>
    )
  }
}

export default CartSidebarFooter