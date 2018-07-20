import React from 'react'
import styled from 'styled-components'

import { Product } from '../components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Hat = () => (
  <Container>
    <Product
      title="Lipslut Hat."
      claims={[
        'Help our community grow by bringing us into the real world!',
        'The Lipslut hat is an unstructured 6-panel cap featuring our iconic swatch logo on the front. Made with breathable cotton, a curved brim, and a slouched silhouette, it’s the perfect hat for everyday.',
        'Adjustable unisex sizing—one size fits most.',
      ]}
      images={[
        'https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/5a123efc53450af6e5e75f69/5a123fec41920282358517f7/1511145491984/FullSizeRender.jpg?format=750w',
      ]}
      price={29.95}
    />
  </Container>
)

export default Hat
