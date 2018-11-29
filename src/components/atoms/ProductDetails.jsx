import React, { Component } from 'react'
import styled from 'styled-components'
import lightBlue from '../../layouts/lightBlue'
import { graphql, StaticQuery } from 'gatsby'
import { FaCalendarMinus } from 'react-icons/fa'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 3rem;

  .ProductDetails-heading-5 {
    font-size: 1.38316rem;
    margin-bottom: 1rem;
  }

  .ProductDetails-paragraph {
    font-size: 0.9rem;
    margin-bottom: 2rem;
  }

  .ProductDetails-heading-6 {
    font-weight: bold;
    font-size: 0.9rem;
  }

  .ProductDetails-leftContent,
  .ProductDetails-rightContent {
    display: flex;
    flex-basis: 30%;
    flex-direction: column;
  }

  .ProductDetails-leftContent {
    margin-left: 4rem;
  }

  .ProductDetails-rightContent {
    margin-right: 4rem;
  }

  @media screen and (max-width: 414px) {
    flex-direction: column;

    .ProductDetails-leftContent,
    .ProductDetails-rightContent {
      margin: 2rem;
    }
  }
`

class ProductDetails extends Component {
  render() {
    let leftContent = []
    let rightContent = []
    let { claims } = this.props.product
    let keyIndex = claims.findIndex(elem => {
      return elem.content[0].value === 'Key Ingredients: '
    })
    for (let i = 0; i < keyIndex; i++) {
      leftContent.push(
        <div className={`ProductDetails-${claims[i].nodeType}`}>
          {claims[i].content[0].value}
        </div>
      )
    }

    for (let i = keyIndex; i < claims.length; i++) {
      rightContent.push(
        <div className={`ProductDetails-${claims[i].nodeType}`}>
          {claims[i].content[0].value}
        </div>
      )
    }

    return (
      <Container>
        <div className="ProductDetails-leftContent">{leftContent}</div>
        <div className="ProductDetails-rightContent">{rightContent}</div>
      </Container>
    )
  }
}

export default lightBlue(ProductDetails)
