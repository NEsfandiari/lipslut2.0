import React, { Component } from 'react'
import { Product } from './atoms'
import Styled from 'styled-components'

const Container = Styled.div`
    display: flex;
    justify-content: space-between;
`

const Featured = () => (
  <Container>
    <Product
      title="F*ck Trump."
      route="/trump"
      image="https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/t/5a114c56652dea88b02f4156/1511125818700/?format=750w"
    />
    <Product
      title="F*ck Hollywood."
      route="/hollywood"
      image="https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/t/5a114c2c71c10ba553225e61/1511144864804/?format=750w"
    />
  </Container>
)

export default Featured
