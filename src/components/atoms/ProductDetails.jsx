import React, { Component } from 'react'
import { FaTimes } from 'react-icons/fa'
import Modal from '../Modal'
import styled from 'styled-components'
import lightBlue from '../../layouts/lightBlue'

const Container = styled.div`
  padding: 4rem 5rem 0rem;
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

//inline style for modal background (used inline style so we did not need to add more styles to top level index.css)
//styled components do not apply due to use of portal
const style = {
  display: 'flex',
  alignItems: 'center',
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  zIndex: 100000,
}

const ingredientsStyle = {
  border: '2px solid black',
  padding: '2em',
  backgroundColor: 'white',
  width: '70%',
  height: 'fit-content',
  margin: '0 auto',
}

class ProductDetails extends Component {
  constructor(props) {
    super(props)
    this.state = { hideList: true }
    this.toggleList = this.toggleList.bind(this)
  }

  toggleList() {
    this.setState(st => ({ hideList: !st.hideList }))
  }

  render() {
    let leftContent = []
    let rightContent = []
    let { claims } = this.props.product

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

        {this.state.hideList ? (
          ''
        ) : (
          //Modal component is rendered with a portal
          //everything inside Modal is rendered at the top level (index.js)
          <Modal>
            <div style={style}>
              <div id="ingredientsBox" style={ingredientsStyle}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <h3>Ingredients</h3>
                  </div>
                  <div>
                    <button
                      style={{
                        backgroundColor: 'none',
                        border: 'none',
                        outline: 0,
                      }}
                      onClick={this.toggleList}
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
                <p style={{ fontSize: '12px', lineHeight: '20px' }}>
                  {this.props.product.ingredients}
                </p>
              </div>
            </div>
          </Modal>
        )}
      </Container>
    )
  }
}

export default lightBlue(ProductDetails)
