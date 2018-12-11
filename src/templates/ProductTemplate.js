import React, { Component } from 'react'
import styled from 'styled-components'
import { Product, ProductDetails } from '../components'
import DataVis from '../components/molecules/DataVis'
import orderSorter from '../utilities/orderSorter'
import { graphql, StaticQuery } from 'gatsby'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const query = graphql`
  {
    allOrdersCsv {
      edges {
        node {
          Line_Item_Name
          Line_Item_Qty
          Shipping_State
        }
      }
    }
  }
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

    //This is used to map the data.title product name to the supplier's product name.
    //If the suppliers product name contiunes to change, the values in mapTitleToOrders can be made into
    //an array and then <--- fix this Victor. giggle giggle
    const mapTitleToOrders = {
      'F*ck Trump.': '"F*ck Trump" Pink Matte Liquid Lipstick -',
      'F*ck Kavanaugh': 'F*ck Kavanaugh Matte Liquid Lipstick -',
      'F*ck Hollywood.': 'F*ck Hollywood Matte Liquid Lipstick -',
      'BATCH—001: "02"': 'BATCH—001: "02" -',
      'BATCH—001: "04"': 'BATCH—001: "04" -',
      'BATCH—001: "05"': 'BATCH—001: "05" -',
      'Lipslut Hat.': 'Lipslut Hat -',
      'Leftylibglobalistsantifacommiesocialisthollyweirdopigs.':
        'Leftylibglobalistsantifacommiesocialisthollyweirdopigs -',
    }

    let productDetails
    if (data.claims && data.ingredients) {
      const claims = data.claims.content
      const ingredients = data.ingredients.content[0].content[0].value
      productDetails = (
        <React.Fragment>
          <ProductDetails claims={claims} ingredients={ingredients} />
          <StaticQuery
            query={query}
            render={order => {
              let ordersData = orderSorter(order.allOrdersCsv.edges)
              return (
                <DataVis
                  ordersData={ordersData[mapTitleToOrders[data.title]]}
                />
              )
            }}
          />
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
      </React.Fragment>
    )
  }
}

export default ProductTemplate
