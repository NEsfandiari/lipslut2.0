import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 10rem;
  padding-right: 10rem;
  padding-top: 5rem;
  a {
    color: #9ae0f5;
    transition: 0.3s;
  }
  a:hover {
    color: #b7f2ff;
  }
  h1 {
    font-size: 4rem;
  }
  animation: fadein 1s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

class Contact extends Component {
  componentDidMount() {
    this.props.resetSidebar()
  }
  render() {
    return (
      <Container>
        <h1>Contact Us</h1>
        <p>
          Have a question? Chances are the answer is on our{' '}
          <Link to="/faq">FAQ page.</Link>
        </p>
        <p>
          If not, or if you just want to chat, please reach out to us through
          our Facebook page. We'll get back to you within 48 business hours.
        </p>
        <p>
          For all Business or Public Relations inquiries:{' '}
          <a href="mailto:Hello.Lipslut@gmail.com">Hello.Lipslut@gmail.com</a>
        </p>
      </Container>
    )
  }
}

export default Contact
