import React from 'react'
import Styled from 'styled-components'

import { FeaturedProduct } from './molecules'

const Container = Styled.div`
    display: flex;
    justify-content: space-between;
  @media (max-width: 420px) {
    flex-direction: column;
  }
`

const HomePageFeatured = () => (
  <Container>
    <FeaturedProduct
      title="F*ck Trump."
      route="/Fck-Trump"
      image="https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/t/5a114c56652dea88b02f4156/1511125818700/?format=750w"
    />
    <FeaturedProduct
      title="F*ck Hollywood."
      route="/Fck-Hollywood"
      image="https://images.ctfassets.net/ubhny9w4s07i/4fd0NCp7lS6yIKCc2o0wYO/257a74d31047788161e269e357b552d8/2_tubes_red.jpg"
    />
  </Container>
)

export default HomePageFeatured
