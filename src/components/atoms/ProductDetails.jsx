import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { FaTimes } from 'react-icons/fa'
import Modal from '../Modal'
import styled from 'styled-components'
import lightBlue from '../../layouts/lightBlue'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 3rem;
  padding-bottom: 3rem;

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

  .ProductDetails-ingredientList-Link {
    color: blue;
    text-decoration: underline;
  }

  @media screen and (max-width: 414px) {
    flex-direction: column;

    .ProductDetails-leftContent,
    .ProductDetails-rightContent {
      margin: 2rem;
    }
  }
`

//inline style for modal background (used inline style so we did not need to add more styles to top level index.css)
//styled components do not apply due to use of portal
const style = {
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
  width: '50%',
  margin: '0 auto',
  marginTop: '25%',
}

class ProductDetails extends Component {
  constructor(props) {
    super(props)
    this.state = { hideList: true }
    this.toggleList = this.toggleList.bind(this)
  }

  toggleList() {
    this.setState(st => ({ hideList: !st.hideList }))
    console.log('clicked')
  }

  render() {
    let leftContent = []
    let rightContent = []
    let { claims } = this.props.product

    //finds index where ingredients List begins
    let keyIndex = claims.findIndex(elem => {
      return elem.content[0].value === 'Key Ingredients: '
    })

    //renders jsx for left side product details
    for (let i = 0; i < keyIndex; i++) {
      leftContent.push(
        <div className={`ProductDetails-${claims[i].nodeType}`}>
          {claims[i].content[0].value}
        </div>
      )
    }

    //renders jsx for right side product details (ingredients)
    for (let i = keyIndex; i < claims.length; i++) {
      //makes clickable button for ingredient list
      if (claims[i].content[0].value === 'Full ingredient list') {
        rightContent.push(
          <div
            onClick={this.toggleList}
            className={`ProductDetails-ingredientList-Link`}
          >
            {claims[i].content[0].value}
          </div>
        )
      } else {
        rightContent.push(
          <div className={`ProductDetails-${claims[i].nodeType}`}>
            {claims[i].content[0].value}
          </div>
        )
      }
    }
    return (
      <Container>
        <div className="ProductDetails-leftContent">{leftContent}</div>
        <div className="ProductDetails-rightContent">{rightContent}</div>
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
                      style={{ backgroundColor: 'none', border: 'none' }}
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
