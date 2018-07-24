import React, { Component } from 'react'
import styled from 'styled-components'
import { FaClose } from 'react-icons/lib/fa'
import { LinkButton, StyledHr } from '../atoms'
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
  render() {
    const animation =
      'animated ' + (this.props.display ? 'slideInRight' : 'slideOutRight')
    return (
      <Container className={animation}>
        <div className="contents">
          <div className="header">
            <div>
              <FaClose onClick={this.props.handleSidebar} />
            </div>
            <h1>Items</h1>
          </div>
          <StyledHr />
          <LinkButton to="/checkout">CHECKOUT</LinkButton>
        </div>
      </Container>
    )
  }
}

export default CartSidebar
