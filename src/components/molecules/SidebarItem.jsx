import React, { Component } from 'react'
import { TiTrash } from 'react-icons/lib/ti'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content:space-between
    width: 90%;
    margin-bottom: 1rem;
    margin-right: 3rem;
    img{
        flex-basis: 33%;
        height: 4rem;
        padding-left: 1.7rem;
        padding-right: 1.7rem;
        margin: 0;
    }
    .item-total{
        display:flex;
        flex-direction: column;
        align-items: center;
        svg{
            cursor: pointer;
        }   
    }
    .adjust{
        display: flex
        justify-content: space-around;
        flex-basis: 33%;
        width: 100%;
        div{
            cursor: pointer;
        }
    }
    .price{
        flex-basis: 33%;
        text-align: center;
        margin-bottom: .7rem;
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
          <div className="adjust">
            <div className="sub" onClick={handleAdjust} data-id={id}>
              -
            </div>
            <p>{item.quantity}</p>
            <div className="add" onClick={handleAdjust} data-id={id}>
              +
            </div>
          </div>
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
