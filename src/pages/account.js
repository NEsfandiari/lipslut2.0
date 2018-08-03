import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`

class Account extends Component {
  state = {}
  render() {
    return (
      <Container>
        <h1>Order History</h1>
      </Container>
    )
  }
}

export default Account
