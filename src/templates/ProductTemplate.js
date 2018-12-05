import React, { Component } from 'react'
import styled from 'styled-components'
<<<<<<< HEAD
import ProductsStage from '../components/molecules/ProductsStage'
import { Product } from '../components'
import DataVis from '../components/molecules/DataVis'
=======
import { Product, ProductDetails } from '../components'
>>>>>>> master

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

class ProductTemplate extends Component {
  componentDidMount() {
    this.props.resetSidebar()
  }
  render() {
    const data = this.props.pageContext.node
    const charities = data.charities
    const images = data.images.map(img => img.file.url)

    let productDetails
    if (data.claims && data.ingredients) {
      const claims = data.claims.content
      const ingredients = data.ingredients.content[0].content[0].value
      productDetails = (
        <ProductDetails claims={claims} ingredients={ingredients} />
      )
    }
    return (
      <React.Fragment>
        <Container>
          <Product
            title={data.title}
            productCopy={data.productCopy.content}
            images={images}
            price={data.price}
            sku={data.sku}
            charities={charities}
          />
        </Container>
        {productDetails}
      </React.Fragment>
    )
  }
}

export default ProductTemplate
