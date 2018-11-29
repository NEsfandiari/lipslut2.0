import React, { Component } from 'react'
import styled from 'styled-components'
import { ProductPhotos, ProductDescription } from './molecules'
import { CartConsumer } from '../containers/CartContext'
import ProductsStage from './molecules/ProductsStage'
import { graphql, StaticQuery } from 'gatsby'

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
  @media (max-width: 420px) {
    flex-direction: column;
    width: 95%;
    position: relative;
    margin-top: 1rem;
  }
`
// graphql query to get all products
const query = graphql`
  {
    allContentfulProductPage {
      edges {
        node {
          title
          claims {
            content {
              nodeType
              content {
                value
              }
            }
          }
          ingredients {
            content {
              content {
                value
              }
            }
          }
        }
      }
    }
  }
`

class Product extends Component {
  render() {
    const { images, productCopy, title, price, sku } = this.props
    return (
      <React.Fragment>
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
              />
            )}
          </CartConsumer>
        </Container>

        {/* query data needs to be sorted in the products stage component.
            ProductDetails is created in there */}
        <StaticQuery
          query={query}
          render={data => {
            return <ProductsStage data={data} title={title} />
          }}
        />
      </React.Fragment>
    )
  }
}

export default Product
