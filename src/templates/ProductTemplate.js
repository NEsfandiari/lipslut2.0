import React, { Component } from 'react'
import styled from 'styled-components'
import ProductsStage from '../components/molecules/ProductsStage'
import { Product } from '../components'

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
    const images = data.images.map(img => img.file.url)
    let productMedia

    // TODO: Replace Code with conditionals over ingredients list

    // if (data.sellingPoints) {
    //   const sellingPoints = data.sellingPoints.data
    //   const media = data.mediaLogos.map(img => {
    //     return {
    //       image: img.file.url,
    //     }
    //   })
    //   data.mediaStories.forEach((story, i) => {
    //     media[i]['link'] = story
    //   })
    //   productMedia = (
    //     <ProductMedia sellingPoints={sellingPoints} media={media} />
    //   )
    // }
    return (
      <React.Fragment>
        <Container>
          <Product
            title={data.title}
            productCopy={data.productCopy.content}
            images={images}
            price={data.price}
            sku={data.sku}
          />
          {productMedia}
        </Container>
        <ProductsStage data={data} title={data.title} />
      </React.Fragment>
    )
  }
}

export default ProductTemplate
