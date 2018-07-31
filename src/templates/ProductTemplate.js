import React, { Component } from 'react'
import styled from 'styled-components'

import { Product, ProductMedia } from '../components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
class ProductTemplate extends Component {
  render() {
    const data = this.props.pathContext.node
    const images = data.images.map(img => img.fields.file.url)

    // if there is media to link to
    if (data.sellingPoints) {
      const sellingPoints = data.sellingPoints.data
      const media = data.mediaLogos.map(img => {
        return {
          image: img.fields.file.url,
        }
      })
      data.mediaStories.forEach((story, i) => {
        media[i]['link'] = story
      })
      const ProductMedia = (
        <ProductMedia sellingPoints={sellingPoints} media={media} />
      )
    }
    return (
      <Container>
        <Product
          title={data.title}
          descriptors={data.descriptors}
          images={images}
          price={data.price}
          addItem={this.props.addItem}
        />
        {ProductMedia}
      </Container>
    )
  }
}

export default ProductTemplate
