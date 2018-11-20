import React, { Component } from 'react'
import Styled from 'styled-components'
import { FooterLeftSide, FooterRightSide } from './molecules'

const Container = Styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    padding: 2rem 7rem;
    background-color: #75CAEB;
    color: white;
    .middle{
      flex-basis: 20%;
      display: flex;
      justify-content: center;

    }
    .divider{
      height: 16rem;
      width: 2px;
      border-left: 1.5px solid black;
    }
    @media (max-width: 420px) {
      flex-direction: column;
      padding: 3rem;
      .divider{
        display: none;
      }
    }
`

class Footer extends Component {
  render() {
    return (
      <Container>
        <FooterLeftSide />
        <div className="middle">
          <div className="divider" />
        </div>
        <FooterRightSide />
      </Container>
    )
  }
}

export default Footer
