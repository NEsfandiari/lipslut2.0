import React, { Component } from 'react'
import ProductDetails from '../atoms/ProductDetails'

//formats data from contentful to create productDetails with data
class ProductsStage extends Component {
  constructor(props) {
    super(props)
    const { claims, ingredients, title } = this.props.data
    this.product = {}
    this.product['claims'] = claims ? claims.content : null
    this.product['ingredients'] = ingredients
      ? ingredients.content[0].content[0].value
      : null
  }

  //if there are no claims, do not render product details (for hat)
  render() {
    return this.product.claims ? (
      <ProductDetails product={this.product} />
    ) : null
  }
}

export default ProductsStage
