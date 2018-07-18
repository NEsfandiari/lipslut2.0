import React, { Component } from 'react'
import Styled from 'styled-components'

import { LinkButton } from '../atoms'

const Container = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: .5rem;
    h2 {
      font-size: 2rem;
    }
`

const Product = ({ title, image, route }) => (
  <Container className="product">
    <img src={image} />
    <h2>{title}</h2>
    <LinkButton to={route}>
      <b>SHOP NOW</b>
    </LinkButton>
  </Container>
)

export default Product
