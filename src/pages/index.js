import React, { Component } from 'react'
import Styled from 'styled-components'
import 'futura-font/styles.css'

import { Featured, Mission } from '../components'
import { StyledHr } from '../components/atoms'

const Container = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  input{
      height: 3rem;
      width: 13rem;
      font-size: .8rem;
      text-align: center;
      padding: 0;
      border-style: solid;
    border-color: #f0f0f0;
    border-width: 2px;
    outline: none;
    border-radius: 3px;
  }
  button{
      margin-left: 1rem;
      font-size: .8rem;
      padding: 0;
      height: 3rem;
      width: 7rem;
      color: white;
      background-color: #FF0086;
      border-radius: 2px;
  }
  button:hover{
    background-color: #FF33A1;
  }
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
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <button>{this.state.status}</button>
        </form>
      </Container>
    )
  }
}

export default IndexPage
