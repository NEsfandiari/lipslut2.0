import React from 'react'
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
  }
  button{
      margin-left: 1rem;
      font-size: .8rem;
      padding: 0;
      height: 3rem;
      width: 7rem;
      color: white;
      background-color: #FF0086;
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

const IndexPage = () => (
  <Container>
    <Featured />
    <StyledHr />
    <Mission />
    <StyledHr width="65%" />
    <form action="">
      <input type="text" placeholder="Email Address" />
      <button>JOIN US.</button>
    </form>
  </Container>
)

export default IndexPage
