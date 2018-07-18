import React from 'react'
import Styled from 'styled-components'
import 'futura-font/styles.css'

import { Featured, Mission, Footer } from '../components'
import { StyledHr } from '../components/atoms'

const Container = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'futura';
   h1, h2, h3, h4, p{
    font-family: 'futura';
   }
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
`

const IndexPage = () => (
  <Container>
    <Featured />
    <StyledHr />
    <Mission />
    <StyledHr />
    <form action="">
      <input type="text" placeholder="Email Address" />
      <button>JOIN US.</button>
    </form>
  </Container>
)

export default IndexPage
