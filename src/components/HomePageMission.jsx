import React, { Component } from 'react'
import Styled from 'styled-components'

import { LinkButton } from './atoms'
import { MissionStatement, MissionPhilosophy } from './molecules'

const Container = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .statements{
    display:flex;
    justify-content: space-between
  }
  h2{
    font-size: 2rem;
  }
  @media (max-width: 420px) {
    .statements{
      flex-direction: column;
    }
  }
`

const HomePageMisson = () => (
  <Container>
    <h2>What we're about.</h2>
    <div className="statements">
      <MissionStatement
        title="Take a stand"
        text="We work with you to create cause-driven products that start conversations."
        image="https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/t/5a0e6e7871c10b10891ca92f/1486789972984/?format=500w"
      />
      <MissionStatement
        title="Support a cause"
        text="50% of earnings are donated to charities chosen by you through popular vote."
        image="https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/t/5a0e6e7871c10b10891ca931/1486790014504/?format=500w"
      />
      <MissionStatement
        title="A better future"
        text="Be part of the movement—help launch Lipslut to empower people for generations to come. "
        image="https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/t/5a0e6e7871c10b10891ca933/1486790093728/GlobeLogo2.png?format=500w"
      />
    </div>
    <LinkButton
      to="/faq"
      className="faq"
      height="2.5rem"
      fontSize=".6rem"
      width="9rem"
      lineHeight="2.4rem"
    >
      <b>LEARN MORE</b>
    </LinkButton>
    <MissionPhilosophy />
  </Container>
)

export default HomePageMisson
