import React, { Component } from 'react'
import styled from 'styled-components'
import 'animate.css'
import { OrderHistory, AccountDetails } from '../components/molecules'

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 2rem;
`

class Account extends Component {
  state = {}
  render() {
    const { curUser } = this.props
    return (
      <Container>
        <OrderHistory curUser={curUser} />
        <AccountDetails curUser={curUser} />
      </Container>
    )
  }
}

export default Account
