import React, { Component } from 'react'
import styled from 'styled-components'
import { FaClose } from 'react-icons/lib/fa'
import { LinkButton, StyledHr } from '../atoms'
import SidebarItem from './SidebarItem'
import 'animate.css'

const Container = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    z-index: 2;
    flex-direction: column;
    align-items: center;
    width: 25rem;
    height: 100%
    background-color: #F9F7F1;

    img{
        height: 4rem;
    }

    .contents{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .header{
        display: flex;
        width: 90%;
        svg{
            margin-right: 6rem;
            cursor: pointer;
        }
    }

`

class CartSidebar extends Component {
  handleAdjust = e => {
    let i = parseInt(e.target.dataset.id)
    if (e.target.className == 'add') {
      let newVal = this.props.cart[i].quantity + 1
      this.props.editCart('quantity', newVal, i)
    } else {
      let newVal = this.props.cart[i].quantity - 1
      newVal < 1 ? (newVal = 1) : newVal
      this.props.editCart('quantity', newVal, i)
    }
  }

  render() {
    const cart = this.props.cart
    const animation =
      'animated ' + (this.props.display ? 'slideInRight' : 'slideOutRight')
    const items = cart.map((item, i) => (
      <SidebarItem
        item={item}
        handleAdjust={this.handleAdjust}
        id={i}
        key={i}
      />
    ))
    const subtotal = this.props.cart
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price * currentValue.quantity
      }, 0)
      .toFixed(2)
    return (
      <Container className={animation}>
        <div className="contents">
          <div className="header">
            <div>
              <FaClose onClick={this.props.handleSidebar} />
            </div>
            <h1>Items</h1>
          </div>
          {items}
          <StyledHr />
          <h4>Subtotal: ${subtotal}</h4>
          <LinkButton to="/checkout" onClick={this.props.handleSidebar}>
            CHECKOUT
          </LinkButton>
        </div>
      </Container>
    )
  }
}

export default CartSidebar
