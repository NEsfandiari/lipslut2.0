import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  div {
    cursor: pointer;
  }
  border: 2px solid;
  background-color: white;
  p {
    margin: 0;
  }
  height: 1.7rem;
  width: 6rem;
`

class QuantityAdjustButton extends Component {
  state = {}
  render() {
    const { handleAdjust, id, item } = this.props
    return (
      <Container>
        <div className="sub" onClick={handleAdjust} data-id={id}>
          -
        </div>
        <p>{item.quantity}</p>
        <div className="add" onClick={handleAdjust} data-id={id}>
          +
        </div>
      </Container>
    )
  }
}

export default QuantityAdjustButton
