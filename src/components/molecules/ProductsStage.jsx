import React, { Component } from 'react'
import ProductDetails from '../atoms/ProductDetails'

//formats data from contentful to create productDetails with data
class ProductsStage extends Component {
  constructor(props) {
    super(props)
    this.product = this.props.data.allContentfulProductPage.edges.reduce(
      (acc, p) => {
        const { claims, ingredients, title } = p.node
        if (this.props.title === title) {
          acc['claims'] = claims ? claims.content : null
          acc['ingredients'] = ingredients
            ? ingredients.content[0].content[0].value
            : null
        }
        return acc
      },
      {}
    )
  }

  //if there are no claims, do not render product details (for hat)
  render() {
    return this.product.claims ? (
      <ProductDetails product={this.product} />
    ) : null
  }
}

export default ProductsStage
