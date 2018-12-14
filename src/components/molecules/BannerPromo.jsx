import React, { Component } from 'react'
import styled from 'styled-components'
import { IoIosClose } from 'react-icons/io'
import { Link } from 'gatsby'

const Container = styled.div`
  position: relative;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e6f8f9;
  padding: 0.5rem;
  height: 2.5rem;
  text-align: center;
  :hover {
    background-color: #d9f3fc;
  }
  .banner-text {
    margin-bottom: 0;
    margin-right: 1rem;
  }
  a {
    border-bottom: 1px solid currentColor;
    :visited {
      color: #4100f1;
    }
    :hover {
      color: #4300fc;
    }
  }
  svg:hover {
    color: dimgrey;
    cursor: pointer;
  }
  @media (max-width: 420px) {
    .banner-text {
      font-size: 0.85rem;
      margin: 0.5rem;
      width: 80%;
      line-height: 1rem;
    }
  }
`
class BannerPromo extends Component {
  state = {
    display: true,
  }

  hidePromo = () => {
    this.setState({ display: false })
    this.props.handleBannerMargin(3.5)
  }

  render() {
    const display = this.state.display ? 'flex' : 'none'
    return (
      <Container style={{ display: display }}>
        <p className="banner-text">
          Checkout our newest Batch, 100% of Profits towards charity.{' '}
          <Link to='/BATCH—001:-"02"'>Click Here</Link>
        </p>
        <IoIosClose onClick={this.hidePromo} size="1.5rem" />
      </Container>
    )
  }
}

export default BannerPromo
