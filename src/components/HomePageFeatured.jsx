import React from 'react'
import Styled from 'styled-components'

import { FeaturedProduct } from './molecules'

const Container = Styled.div`
    display: flex;
    justify-content: space-between;
    padding: 3rem 9rem 5rem;
    margin-bottom: 3rem;
  @media (max-width: 420px) {
    flex-direction: column;
    padding: 0;
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
      title="F*ck Kavanaugh."
      route="/Fck-Kavanaugh"
      image="https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/t/5bb2488a53450a0af5e2ec05/1538410688367/news-kav2.png?format=750w"
    />
  </Container>
)

export default HomePageFeatured
