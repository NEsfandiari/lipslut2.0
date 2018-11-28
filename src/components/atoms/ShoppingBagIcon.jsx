import React, { Component } from 'react'
import styled from 'styled-components'
import { CartConsumer } from '../../containers/CartContext'
import { graphql, StaticQuery } from 'gatsby'

const Container = styled.div`
  cursor: pointer;
  display: flex;
  padding: 0.5rem;
  margin-bottom: 0.4rem;
  img {
    height: 1.9rem;
    margin: 0;
    max-width: 1.8rem;
  }
  p {
    position: relative;
    cursor: pointer;
    margin: 0;
    padding: 0;
    right: 0.8rem;
    width: 1.1rem;
    height: 1.1rem;
    color: white;
    line-height: 1.2rem;
    font-size: 0.65rem !important;
    border-radius: 1000px;
    background-color: #ff0086;
    text-align: center;
  }
`

class ShoppingBagIcon extends Component {
  render() {
    const { click } = this.props
    return (
      <Container>
        <StaticQuery
          query={graphql`
            {
              contentfulHomePage(pageName: { eq: "Home Page V1" }) {
                cartIcon {
                  fluid {
                    src
                  }
                }
              }
            }
          `}
          render={data => (
            <img
              src={data.contentfulHomePage.cartIcon.fluid.src}
              alt="cartIcon"
              onClick={click}
            />
          )}
        />
        <CartConsumer>
          {cartContext => <p onClick={click}>{cartContext.cart.length}</p>}
        </CartConsumer>
      </Container>
    )
  }
}

export default ShoppingBagIcon
