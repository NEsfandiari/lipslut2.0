import React, { Component } from 'react'
import Styled from 'styled-components'
import Link from 'gatsby-link'

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
class Product extends Component {
  state = {}
  render() {
    const { title, image, route } = this.props
    return (
      <Container className="product">
        <Link to={route}>
          <img src={image} />
        </Link>
        <h2>{title}</h2>
        <LinkButton to={route}>
          <b>SHOP NOW</b>
        </LinkButton>
      </Container>
    )
  }
}

export default Product
