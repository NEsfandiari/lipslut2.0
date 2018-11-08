import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin-top: 0.7rem;
  margin-left: 1rem;
  .contents {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }
  p {
    margin: 0;
    text-align: center;
  }
  .item-details {
    margin: 0.5rem;
  }
  img {
    height: 4rem;
    width: 4rem;
    margin: 0;
  }
  .price {
    text-align: center;
    width: 4rem;
    font-size: 0.7rem;
  }
`
class SummaryItem extends Component {
  render() {
    const { item, id } = this.props
    return (
      <Container>
        <div className="contents">
          <img src={item.image} alt="Checkout Product Icon" />
          <div className="item-details">
            <p>{item.title}</p>
          </div>
          <p className="price">
            {item.quantity} x ${item.price}
          </p>
        </div>
      </Container>
    )
  }
}

export default SummaryItem
