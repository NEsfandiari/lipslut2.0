import React, { Component } from 'react'
import Styled from 'styled-components'
import Link from 'gatsby-link'

const Container = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: .5rem;
`

const Product = ({ title, image, route }) => (
  <Container className="product">
    <img src={image} />
    <h2>{title}</h2>
    <Link to={route}>
      <b>SHOP NOW</b>
    </Link>
  </Container>
)

export default Product
