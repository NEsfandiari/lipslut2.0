import React, { Component } from 'react'
import styled from 'styled-components'
import { FooterSocialIcons, FooterEmailForm } from '../atoms'

const Container = styled.div`
  padding-top: 2rem;
  flex-basis: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .label {
    margin: 0;
  }
  @media (max-width: 420px) {
    width: 100%;
  }
`

class FooterLeftSide extends Component {
  render() {
    return (
      <Container>
        <h3>Join Us</h3>
        <p>
          Be in the know with what we do next—products, promos, pop-ups, and
          everything Lipslut.{' '}
        </p>
        <p className="label">Email</p>
        <FooterEmailForm />
        <FooterSocialIcons />
      </Container>
    )
  }
}

export default FooterLeftSide
