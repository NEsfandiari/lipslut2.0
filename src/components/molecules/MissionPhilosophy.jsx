import React from 'react'
import Styled from 'styled-components'

const Container = Styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 4rem;
  padding: 4rem;
  div{
      display: flex;
      flex-direction:column;
      align-items: center;
  }
  h1{
      font-size: 3.5rem;
  }
  p{
    font-size: .9rem;
    text-align: center;
  }
  .slogans{
      flex-basis: 40%;
  }
  .philosophy{
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    flex-basis: 60%;
  }
  @media (max-width: 420px) {
    h1{
      font-size: 2rem;
    }
    flex-direction: column;
  }
`

const MissionPhilosophy = () => (
  <Container>
    <div className="slogans">
      <h1>Do Good.</h1>
      <h1>Be Bold.</h1>
    </div>
    <div className="philosophy">
      <p>What if companies prided themselves on pushing to improve society?</p>
      <p>
        Lipslut is fashion, subversion, and a middle finger to the current
        sociopolitical landscape. By working hard towards solving the issues you
        care about, Lipslut is ready to help you make a statement.
      </p>
      <p>Join Lipslut on our path to changing the world one face at a time.</p>
    </div>
  </Container>
)

export default MissionPhilosophy
