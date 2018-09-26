import React, { Component } from 'react'
import styled from 'styled-components'
import { FaClose } from 'react-icons/lib/fa'
import Link from 'gatsby-link'

const Container = styled.div`
  justify-content: center;
  align-items: center;
  background-color: #e6f8f9;
  padding: 0.5rem;
  position: relative;
  text-align: center;
  width: 110%;
  right: 5%;
  top: 0;
  :hover {
    background-color: #d9f3fc;
  }
  p {
    margin-bottom: 0;
    margin-right: 1rem;
  }
  a {
    border-bottom: 1px solid currentColor;
  }
  a:visited {
    color: #4100f1;
  }
  a:hover {
    color: #4300fc;
  }
  svg:hover {
    color: dimgrey;
    cursor: pointer;
  }
`
class BannerPromo extends Component {
  state = {
    display: true,
  }

  hidePromo = () => {
    this.setState({ display: false })
  }

  render() {
    const display = this.state.display ? 'flex' : 'none'
    return (
      <Container style={{ display: display }}>
        <p>
          {' '}
          Checkout our newest Batch, 100% of Profits towards charity.{' '}
          <Link to="/Lipslut-Lab">Click Here</Link>
        </p>
        <FaClose onClick={this.hidePromo} />
      </Container>
    )
  }
}

export default BannerPromo
