import React, { Component } from 'react'
import Styled from 'styled-components'

const Container = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: .5rem;
    flex-basis: 33%;
    img{
        height: 15rem;
    }
    p{
        font-size: .9rem;
        text-align: center;
    }
`

const MissionStatement = ({ title, text, image }) => (
  <Container>
    <img src={image} alt="Mission Image" />
    <h3>{title}</h3>
    <p>{text}</p>
  </Container>
)

export default MissionStatement
