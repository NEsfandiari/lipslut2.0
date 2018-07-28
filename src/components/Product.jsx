import React, { Component } from 'react'
import styled from 'styled-components'
import 'animate.css'

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
      quantity: 1,
      price: this.props.price,
      buttonText: 'ADD TO CART',
    }
  }

  hadnlePhoto = e => {
    this.setState({ highlight: parseInt(e.target.name) })
  }

  handleChange = e => {
    const newPrice = e.target.value * this.props.price
    this.setState({
      [e.target.name]: e.target.value,
      price: newPrice.toFixed(2),
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.addItem(
      this.props.title,
      this.state.price,
      this.state.quantity,
      this.props.images[0]
    )
    this.setState({ buttonText: 'ADDED!' })
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
          <form className="purchase" onSubmit={this.handleSubmit}>
            <p>${this.state.price}</p>
            <label htmlFor="quantity">Quantity: </label>
            <input
              type="number"
              name="quantity"
              onChange={this.handleChange}
              value={this.state.quantity}
              id="quantity"
              min="1"
            />
            <StyledButton height={'4rem'} width={'8.5rem'} fontSize={'.65rem'}>
              <b>{this.state.buttonText}</b>
            </StyledButton>
          </form>
        </div>
      </Container>
    )
  }
}

export default Product
