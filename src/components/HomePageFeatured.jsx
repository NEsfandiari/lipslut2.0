import React, { Component } from 'react'
import Styled from 'styled-components'
import { FeaturedProduct } from './molecules'

const Container = Styled.div`
    display: flex;
    justify-content: space-between;
    padding: 2rem 9rem 5rem;
    margin-bottom: 3rem;
  @media (max-width: 1050px){
    padding: 2rem
  }
  @media (max-width: 420px) {
    flex-direction: column;
    padding: 0;
  }
`
class HomePageFeatured extends Component {
  render() {
    const { titles, photos } = this.props
    return (
      <Container>
        <FeaturedProduct
          title={titles[0]}
          route="/Fck-Trump"
          image={photos[0].fluid.src}
        />
        <FeaturedProduct
          title={titles[1]}
          route="/Fck-Kavanaugh"
          image={photos[1].fluid.src}
        />
      </Container>
    )
  }
}
export default HomePageFeatured
