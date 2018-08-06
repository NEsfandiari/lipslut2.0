import React, { Component } from 'react'
import styled from 'styled-components'
import 'animate.css'
import { OrderHistory, AccountDetails } from '../components/molecules'
import { Loading } from '../components/atoms'

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 2rem;
`

class Account extends Component {
  render() {
    const { curUser } = this.props
    return (
      <div>
        {curUser ? (
          <Container>
            <OrderHistory curUser={curUser} />
            <AccountDetails curUser={curUser} />
          </Container>
        ) : (
          <Loading />
        )}
      </div>
    )
  }
}

export default Account
