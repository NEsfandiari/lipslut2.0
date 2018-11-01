import React, { Component } from 'react'
import { TiTrash } from 'react-icons/lib/ti'
import styled from 'styled-components'
import { QuantityAdjustButton } from '../atoms'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
  margin-right: 3rem;
  img {
    flex-basis: 30%;
    height: 3.5rem;
    padding-left: 1.7rem;
    padding-right: 1.7rem;
    margin: 0;
  }
  p {
    margin: 0;
    line-height: 0.9rem;
  }
  .item-details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-basis: 40%;
  }
  .item-total {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    svg {
      cursor: pointer;
    }
  }
  .price {
    flex-basis: 20%;
    text-align: center;
    margin-bottom: 0.7rem;
  }
`
class SidebarItem extends Component {
  state = {}
  handleCLick = () => {
    this.props.removeItem(this.props.id)
  }
  render() {
    const { item, handleAdjust, id } = this.props
    return (
      <Container>
        <img src={item.image} alt="Cart Product Icon" />
        <div className="item-details">
          <p>{item.title}</p>
          <QuantityAdjustButton
            item={item}
            handleAdjust={handleAdjust}
            id={id}
          />
        </div>
        <div className="item-total">
          <p className="price">${(item.price * item.quantity).toFixed(2)}</p>
          <TiTrash size={'1.5rem'} onClick={this.handleCLick} />
        </div>
      </Container>
    )
  }
}

export default SidebarItem
