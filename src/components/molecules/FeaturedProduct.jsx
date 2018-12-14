import React, { Component } from 'react'
import Styled from 'styled-components'
import { Link } from 'gatsby'

import { LinkButton } from '../atoms'

const Container = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: .5rem 1rem;
    .button:hover{
        b{
          color:white;
        }
      }
    h2 {
      font-size: 2rem;
    }
    b{
      color: #FF0086;   
    }
`
class Product extends Component {
  state = {}
  render() {
    const { title, image, route } = this.props
    return (
      <Container className="product">
        <Link to={route}>
          <img src={image} alt="Featured product" />
        </Link>
        <h2>{title}</h2>
        <LinkButton to={route} className="button">
          <b>SHOP NOW</b>
        </LinkButton>
      </Container>
    )
  }
}

export default Product
