import React, { Component } from 'react'
import Styled from 'styled-components'
import 'futura-font/styles.css'
import firebase from '../firebase'

import { Featured, Mission } from '../components'
import { StyledHr, StyledInput, StyledButton } from '../components/atoms'

const Container = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadein 1s;
  @keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }
`

class IndexPage extends Component {
  state = {
    email: '',
    status: 'JOIN US',
  }
  handleSubmit = e => {
    e.preventDefault()
    const db = firebase.store()
    db.collection('users')
      .add({
        email: this.state.email,
      })
      .then(docRef => {
        console.log('Document written with ID: ', docRef.id)
      })
    this.setState({ status: 'WELCOME!', email: '' })
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  render() {
    return (
      <Container>
        <Featured />
        <StyledHr />
        <Mission />
        <StyledHr width="65%" />
        <form onSubmit={this.handleSubmit}>
          <StyledInput
            width="13rem"
            height="3rem"
            borderRadius="3px"
            marginBottom="0"
            type="email"
            placeholder="Email Address"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <StyledButton>{this.state.status}</StyledButton>
        </form>
      </Container>
    )
  }
}

export default IndexPage
