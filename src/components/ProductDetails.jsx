import React, { Component } from 'react'
import styled from 'styled-components'
import ModalLayout from '../layouts/ModalLayout'
import ModalIngredients from './atoms/ModalIngredients'
import lightBlue from '../layouts/lightBlue'

const Container = styled.div`
  padding: 4rem 5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .ProductDetails-Content {
    display: flex;
    justify-content: space-between;
    width: 80%;
  }
  .ProductDetails-heading-5 {
    font-size: 1.4em;
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
    flex-direction: column;
    flex-basis: 45%;
  }
  .ProductDetails-ingredientList-Link {
    color: blue;
    text-decoration: underline;
  }

  @media screen and (max-width: 420px) {
    padding: 1rem 0rem;
    .ProductDetails-Content {
      flex-direction: column;
      width: 100%;
    }
    .ProductDetails-leftContent,
    .ProductDetails-rightContent {
      margin: 2rem;
    }
  }
`

class ProductDetails extends Component {
  state = { hideList: true }

  toggleList = () => {
    this.setState(st => ({ hideList: !st.hideList }))
  }

  render() {
    let leftContent = []
    let rightContent = []
    const { claims } = this.props

    let keyIndex = claims.findIndex(element => {
      return element.content[0].value === 'Key Ingredients: '
    })

    for (let i = 0; i < keyIndex; i++) {
      leftContent.push(
        <div className={`ProductDetails-${claims[i].nodeType}`} key={i}>
          {claims[i].content[0].value}
        </div>
      )
    }

    for (let i = keyIndex; i < claims.length; i++) {
      //makes clickable button for ingredient list
      if (claims[i].content[0].value === 'Full ingredient list') {
        rightContent.push(
          <div
            onClick={this.toggleList}
            className={`ProductDetails-ingredientList-Link`}
            key={i}
          >
            {claims[i].content[0].value}
          </div>
        )
      } else {
        rightContent.push(
          <div className={`ProductDetails-${claims[i].nodeType}`} key={i}>
            {claims[i].content[0].value}
          </div>
        )
      }
    }
    return (
      <Container>
        <div className="ProductDetails-Content">
          <div className="ProductDetails-leftContent">{leftContent}</div>
          <div className="ProductDetails-rightContent">{rightContent}</div>
        </div>

        {this.state.hideList || (
          //ModalLayout component is rendered with a portal
          //everything inside ModalLayout is rendered at the top level (index.js)
          <ModalLayout>
            <ModalIngredients
              ingredients={this.props.ingredients}
              toggleList={this.toggleList}
            />
          </ModalLayout>
        )}
      </Container>
    )
  }
}

export default lightBlue(ProductDetails)
