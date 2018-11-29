import React, { Component } from 'react'

class ProductsStage extends Component {
  constructor(props) {
    super(props)
    const products = {}
    console.log(
      'hey this is the props: ',
      this.props.data.allContentfulProductPage.edges
    )
    this.props.data.allContentfulProductPage.edges.forEach(product => {
      products[product.node.title] = {
        claims: product.node.claims.content
          ? product.node.claims.content
          : null,
        ingredients: product.node.ingredients.content[0].content[0].value
          ? product.node.ingredients.content[0].content[0].value
          : null,
      }
      console.log('hey check this out: ', products)
    })
    console.log('finished')
    /**
     *
     * sorting the data doesn't finish because some products don't have all of the variables
     * Need to use logic to replace those items with nulls
     *
     * ternary needs to go further up the data. Too far down
     *
     */
  }
  render() {
    console.log('hey getting here')
    return <div>hi</div>
  }
}

export default ProductsStage
