import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    .adjust{
        display: flex
        justify-content: space-around;
        width: 100%;
        div{
            cursor: pointer;
        }
    }
`

const SidebarItem = ({ item, handleAdjust, id }) => (
  <Container>
    <img src={item.image} alt="" />
    <div>
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
    <p>${(item.price * item.quantity).toFixed(2)}</p>
  </Container>
)

export default SidebarItem
