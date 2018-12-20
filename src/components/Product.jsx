import React, { Component } from 'react'
import styled from 'styled-components'
import { ProductPhotos, ProductDescription } from './molecules'
import { CartConsumer } from '../containers/CartContext'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  animation: fadein 1s;
  padding: 1rem;
  max-width: 100vw;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @media (max-width: 1050px) {
    flex-direction: column;
    width: 95%;
    position: relative;
    margin-top: 1rem;
  }
`

class Product extends Component {
  render() {
    const {
      availableForSale,
      charities,
      images,
      productCopy,
      title,
      price,
      sku,
    } = this.props
    return (
      <Container>
        <ProductPhotos images={images} />
        <CartConsumer>
          {cartContext => (
            <ProductDescription
              handleCart={cartContext.handleCart}
              productCopy={productCopy}
              title={title}
              price={price}
              images={images}
              sku={sku}
              charities={charities}
              availableForSale={availableForSale}
            />
          )}
        </CartConsumer>
      </Container>
    )
  }
}

export default Product
