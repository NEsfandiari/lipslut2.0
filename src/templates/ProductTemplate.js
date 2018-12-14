import React, { Component } from 'react'
import styled from 'styled-components'
import { Product, ProductDetails } from '../components'
import DataVis from '../components/molecules/DataVis'

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
    const availableForSale = this.props.pageContext.availableForSale
    const images = data.images.map(img => img.file.url)

    let productDetails
    if (data.claims && data.ingredients) {
      const claims = data.claims.content
      const ingredients = data.ingredients.content[0].content[0].value
      productDetails = (
        <React.Fragment>
          <ProductDetails claims={claims} ingredients={ingredients} />
        </React.Fragment>
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
            availableForSale={availableForSale}
          />
        </Container>
        {productDetails}
        {/* only render data visualization for products with charities, which have voting feature */}
        {charities && (
          <DataVis
            ordersData={this.props.pageContext.mapData}
            title={data.title}
          />
        )}
      </React.Fragment>
    )
  }
}

export default ProductTemplate
