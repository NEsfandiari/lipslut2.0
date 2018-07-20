import React, { Component } from 'react'
import styled from 'styled-components'

import { StyledHr, StyledButton } from './atoms'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  animation: fadein 1s;
  @keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }
  img{
    transition: 0.5s;
  }
  input{
      width: 3rem
  }
  p{
      font-size: .9rem;
      margin-bottom: .9rem;
  }
  .photos{
    flex-basis: 50%
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem
  }
  .description{
    flex-basis: 50%
    display: flex;
    flex-direction: column;
    padding: 1rem
  }

  .photoCarousel img{
    max-height: 20vh; 
    opacity: .5;
  }

  .highlight{
    margin-bottom: .6rem;
  }

  .purchase{
      display: flex;
      flex-direction: column;
      align-items: center;
  }

`

class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      highlight: 0,
      price: this.props.price,
    }
  }

  hadnlePhoto = e => {
    this.setState({ highlight: parseInt(e.target.name) })
  }

  handlePrice = e => {
    const newPrice = e.target.value * this.props.price
    this.setState({ price: newPrice.toFixed(2) })
  }

  render() {
    const claims = this.props.claims.map((claim, i) => <p key={i}>{claim}</p>)
    const images = this.props.images.map((image, i) => (
      <img
        src={image}
        key={i}
        name={i}
        onClick={this.hadnlePhoto}
        style={this.state.highlight === i ? { opacity: 1 } : {}}
      />
    ))
    const highlight = (
      <img
        src={this.props.images[this.state.highlight]}
        className="highlight animated fadeIn"
      />
    )

    return (
      <Container>
        <div className="photos">
          {highlight}
          <div className="photoCarousel animated slideInRight">{images}</div>
        </div>
        <div className="description">
          <h1>{this.props.title}</h1>
          {claims}
          <StyledHr width={'100%'} margin={'.8rem'} />
          <div className="purchase">
            <p>${this.state.price}</p>
            <label htmlFor="quantity">Quantity: </label>
            <input
              type="number"
              onChange={this.handlePrice}
              id="quantity"
              min="1"
              placeholder="1"
            />
            <StyledButton height={'4rem'} width={'8.5rem'} fontSize={'.65rem'}>
              <b>ADD TO CART</b>
            </StyledButton>
          </div>
        </div>
      </Container>
    )
  }
}

export default Product
