import React from 'react'
import Link from 'gatsby-link'
import { Featured, Mission } from '../components'
import Styled from 'styled-components'
import 'futura-font/styles.css'

const Container = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'futura';
  hr{
    border: 0;
    margin: 2rem;
    height: 1px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
    width: 80%;
  }
  h2{
    font-family: 'futura';
    font-size: 2rem;
  }
  a{
        color: #FF0086
        border-radius: 2px 2px 2px 2px;
        border: 2px solid #FF0086;
        text-decoration: none;
        height: 4rem
        width: 14em;
        text-align: center;
        font-size: .7rem;
        line-height: 3.5rem;
        letter-spacing: .1rem;
    }
    a:hover{
        color: white;
        background-color: #FF0086
    }
`

const IndexPage = () => (
  <Container>
    <Featured />
    <hr />
    <Mission />
  </Container>
)

export default IndexPage
