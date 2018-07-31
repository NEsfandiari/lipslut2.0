import React, { Component } from 'react'
import styled from 'styled-components'
import { ProductPhotos, ProductDescription } from './molecules'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  animation: fadein 1s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

class Product extends Component {
  render() {
    const { images, addItem, descriptors, title, price } = this.props
    return (
      <Container>
        <ProductPhotos images={images} />
        <ProductDescription
          addItem={addItem}
          descriptors={descriptors}
          title={title}
          price={price}
          images={images}
        />
      </Container>
    )
  }
}

export default Product
