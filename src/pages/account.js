import React, { Component } from 'react'
import styled from 'styled-components'
import 'animate.css'
import { OrderHistory, AccountDetails } from '../components'
import { Loading } from '../components/atoms'

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 2rem;
  @media (max-width: 420px) {
    flex-direction: column;
  }
`

class Account extends Component {
  componentDidMount() {
    this.props.resetSidebar()
  }
  render() {
    const { curUser, signIn } = this.props
    return (
      <div>
        {curUser ? (
          <Container>
            <OrderHistory curUser={curUser} signIn={signIn} />
            <AccountDetails curUser={curUser} signIn={signIn} />
          </Container>
        ) : (
          <Loading />
        )}
      </div>
    )
  }
}

export default Account
