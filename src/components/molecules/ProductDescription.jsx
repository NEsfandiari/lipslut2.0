import React, { Component } from 'react'
import styled from 'styled-components'

import { StyledHr, StyledButton } from '../atoms'

const Container = styled.div`
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  .purchase {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  input {
    width: 3rem;
  }
  p {
    font-size: 0.9rem;
    margin-bottom: 0.9rem;
  }
`

class ProductDescription extends Component {
  state = {
    quantity: 1,
    price: this.props.price,
    status: 'ADD TO CART',
  }
  handlePrice = e => {
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
      this.props.price,
      this.state.quantity,
      this.props.images[0]
    )
    this.setState({ status: 'ADDED!' })
  }
  render() {
    const descriptors = this.props.descriptors.map((description, i) => (
      <p key={i}>{description}</p>
    ))
    return (
      <Container>
        <h1>{this.props.title}</h1>
        {descriptors}
        <StyledHr width={'100%'} margin={'.8rem'} />
        <form className="purchase" onSubmit={this.handleSubmit}>
          <p>${this.state.price}</p>
          <label htmlFor="quantity">Quantity: </label>
          <input
            type="number"
            name="quantity"
            onChange={this.handlePrice}
            value={this.state.quantity}
            id="quantity"
            min="1"
          />
          <StyledButton height={'4rem'} width={'8.5rem'} fontSize={'.65rem'}>
            <b>{this.state.status}</b>
          </StyledButton>
        </form>
      </Container>
    )
  }
}

export default ProductDescription
