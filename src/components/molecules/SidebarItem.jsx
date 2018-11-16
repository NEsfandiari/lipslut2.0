import React, { Component } from 'react'
import { TiTrash } from 'react-icons/ti'
import styled from 'styled-components'
import { QuantityAdjustButton } from '../atoms'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95%;
  margin-bottom: 1rem;
  margin-right: 3rem;
  img {
    height: 3.5rem;
    padding-left: 1.7rem;
    padding-right: 1.7rem;
    margin: 0;
  }
  svg {
    cursor: pointer;
  }
  .item-details {
    display: flex;
    align-items: flex-end;
  }
  .item-adjust {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .item-title {
      width: 6rem;
      height: 1.5rem;
      white-space: nowrap;
      overflow: visible;
      margin: 0;
      line-height: 0.9rem;
      text-align: left;
    }
  }
  .item-total {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }
  .price {
    text-align: center;
    margin-bottom: 0.7rem;
  }
`
class SidebarItem extends Component {
  state = {}
  handleCLick = () => {
    this.props.handleCart('remove', this.props.id)
  }
  render() {
    const { item, handleAdjust, id } = this.props
    return (
      <Container>
        <div className="item-details">
          <img src={item.image} alt="Cart Product Icon" />
          <div className="item-adjust">
            <p className="item-title">{item.title}</p>
            <QuantityAdjustButton
              quantity={item.quantity}
              handleAdjust={handleAdjust}
              id={id}
            />
          </div>
          <TiTrash size={'1.5rem'} onClick={this.handleCLick} />
        </div>
        <div className="item-total">
          <p className="price">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      </Container>
    )
  }
}

export default SidebarItem
