import React, { Component } from 'react'
import Styled from 'styled-components'

import { FeaturedProduct } from './molecules'

const Container = Styled.div`
    display: flex;
    justify-content: space-between;
`

const Featured = () => (
  <Container>
    <FeaturedProduct
      title="F*ck Trump."
      route="/fck-trump"
      image="https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/t/5a114c56652dea88b02f4156/1511125818700/?format=750w"
    />
    <FeaturedProduct
      title="F*ck Hollywood."
      route="/fck-hollywood"
      image="https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/t/5a114c2c71c10ba553225e61/1511144864804/?format=750w"
    />
  </Container>
)

export default Featured
