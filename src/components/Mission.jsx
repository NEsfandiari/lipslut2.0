import React, { Component } from 'react'
import Link from 'gatsby-link'
import Styled from 'styled-components'
import { Statement } from './atoms'

const Container = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .statements{
    display:flex;
    justify-content: space-between
  }
  .faq{
    font-size: .6rem;
    height: 2.5rem;
    width: 9rem;
    line-height: 2.4rem
  }
`

const Misson = () => (
  <Container>
    <h2>What we're about.</h2>
    <div className="statements">
      <Statement
        title="Take a stand"
        text="We work with you to create cause-driven products that start conversations."
        image="https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/t/5a0e6e7871c10b10891ca92f/1486789972984/?format=500w"
      />
      <Statement
        title="Support a cause"
        text="50% of earnings are donated to charities chosen by you through popular vote."
        image="https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/t/5a0e6e7871c10b10891ca931/1486790014504/?format=500w"
      />
      <Statement
        title="A better future"
        text="Be part of the movement—help launch Lipslut to empower people for generations to come. "
        image="https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/t/5a0e6e7871c10b10891ca933/1486790093728/GlobeLogo2.png?format=500w"
      />
    </div>
    <Link to="/faq" className="faq">
      <b>LEARN MORE</b>
    </Link>
  </Container>
)

export default Misson
