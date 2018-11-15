import React, { Component } from 'react'
import styled from 'styled-components'

import { StyledHr, StyledButton, QuantityAdjustButton } from '../atoms'

const Container = styled.div`
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  @media (max-width: 420px) {
      padding: 0rem;
      hr{
        margin-left: 0;
        margin-right: 0;
      }
    }
  .purchase {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-around;
    @media (max-width: 420px) {
      flex-direction: column;
    }
  }
  .price {
    font-size: 0.9rem;
    text-align: center;
    padding: .5rem;
    /* border: 2px solid #FF009A */
    margin:0;
    color: #FF009A
    height: 2.5rem
    width: 5rem;
  }
  h1 {
    white-space: nowrap;
    overflow: visible;
    width: 23rem;
  }
   
  }
`

class ProductDescription extends Component {
  state = {
    quantity: 1,
    price: this.props.price,
    status: 'ADD TO BAG',
  }
  handleAdjust = e => {
    let newQuantity
    if (e.target.className === 'add') {
      newQuantity = this.state.quantity + 1
      this.setState({ quantity: newQuantity })
      this.handlePrice(newQuantity)
    } else {
      if (this.state.quantity > 1) {
        newQuantity = this.state.quantity - 1
        this.setState({ quantity: newQuantity })
        this.handlePrice(newQuantity)
      }
    }
  }
  handlePrice = quantity => {
    const newPrice = quantity * this.props.price
    this.setState({
      price: newPrice.toFixed(2),
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.handleCart(
      'add',
      this.props.title,
      this.props.price,
      parseInt(this.state.quantity),
      this.props.images[0],
      this.props.sku
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
          <QuantityAdjustButton
            quantity={this.state.quantity}
            handleAdjust={this.handleAdjust}
            id={''}
            color={'#FF009A'}
            height={'2.5rem'}
          />
          <StyledButton height={'2.5rem'} width={'18rem'} fontSize={'.65rem'}>
            <b>{this.state.status}</b>
          </StyledButton>
          <p className="price">${this.state.price}</p>
        </form>
      </Container>
    )
  }
}

export default ProductDescription
