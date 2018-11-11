import React, { Component } from 'react'
import styled from 'styled-components'
import 'animate.css'
import { OrderHistory, AccountDetails } from '../components'
import { Loading } from '../components/atoms'
import lightBlueLayout from '../layouts/lightBlue.jsx'

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
  padding: 2rem;
  animation: fadein 1s;
  .loading {
    height: 81vh !important;
  }
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @media (max-width: 420px) {
    flex-direction: column;
    margin-top: 1rem;
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
            <AccountDetails curUser={curUser} signIn={signIn} />
            <OrderHistory curUser={curUser} signIn={signIn} />
          </Container>
        ) : (
          <Loading className="loading" />
        )}
      </div>
    )
  }
}

export default lightBlueLayout(Account)
