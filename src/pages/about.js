import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 3rem;
  img{
      flex-basis: 50%;
      max-height: 33rem;
      max-width: 30rem;
  }
  div{
    display: flex;
    flex-direction: column
    flex-basis: 50%;
  }
  h1{
      font-size: 3.5rem;
  }
  animation: fadein 1s;
  @keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }
  @media (max-width: 420px) {
    flex-direction: column;
    h1{
      text-align:center;
    }
  }
`
class About extends Component {
  componentDidMount() {
    this.props.resetSidebar()
  }
  render() {
    return (
      <Container>
        <img src="https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/t/5a126c2b0d92977795831e25/1511156798314/?format=750w" />
        <div>
          <h1>About Us</h1>
          <p>Welcome to Lipslut.</p>
          <p>
            Birthed in the aftermath of the 2016 presidential election, Lipslut
            was founded in Los Angeles by a group of jaded romantics. We're a
            middle finger to the current sociopolitical landscape and practices
            found in the cosmetics industry. We pride ourselves on taking action
            and putting our money where our mouth is. While trends may come and
            go, we believe questioning the world around us and working towards
            improving society will always be “in vogue.”
          </p>
          <p>
            Expect us to provide the best possible products, and to work hard
            towards solving the issues you care about. Join Lipslut on our path
            to changing the world one face at a time.
          </p>
          <p>
            Love,
            <br />
            The Lipslut Team
          </p>
        </div>
      </Container>
    )
  }
}
export default About
