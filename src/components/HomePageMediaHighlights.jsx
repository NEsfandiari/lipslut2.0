import React, { Component } from 'react'
import styled from 'styled-components'
import lightBlueLayout from '../layouts/lightBlue'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 7rem;
  .highlight {
    width: 60%;
    text-align: center;
    font-weight: 700;
    font-family: Playfair Display;
  }
  .brandCarousel {
    width: 60%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 2rem;

    img {
      margin: 1rem;
      opacity: 0.3;
      max-width: 9rem;
    }
  }
  @media (max-width: 420px) {
    padding: 2.5rem 1.5rem;
    .highlight {
      width: 100%;
    }
    .brandCarousel {
      width: 100%;
    }
  }
`

class MediaHighlights extends Component {
  state = {
    highlight: 0,
  }
  handleHighlight = e => {
    this.setState({
      highlight: parseInt(e.target.name),
    })
  }
  render() {
    const highlight = (
      <h1 className="highlight">
        <i>{this.props.quotes[this.state.highlight]}</i>
      </h1>
    )
    const brands = this.props.brands.map((image, i) => (
      <img
        src={image}
        alt={'Brand Logo' + i}
        key={i}
        name={i}
        onMouseEnter={this.handleHighlight}
        style={this.state.highlight === i ? { opacity: 1 } : {}}
      />
    ))
    return (
      <Container>
        {highlight}
        <div className="brandCarousel">{brands}</div>
      </Container>
    )
  }
}

MediaHighlights.defaultProps = {
  quotes: [
    '"Changing both the cosmetics industry and public policy one tube at a time"',
    '"Changing both the cosmetics industry and public policy one tube at a time"',
    '"Changing both the cosmetics industry and public policy one tube at a time"',
  ],
  brands: [
    'https://images.ctfassets.net/ubhny9w4s07i/2LGtGR0HJCgA68aUWaumI/bba1216c43b071f973821d0e30aa4f26/r29new.png',
    'https://images.ctfassets.net/ubhny9w4s07i/5wmWe20og02oi4W2kM4YwY/1b7adb26fd431d81c0788f48d7d7e6c2/bustlenew.png',
    'https://images.ctfassets.net/ubhny9w4s07i/2CzeHWL4V6q2s0yKkaau6k/83a46e7526466025297ff2e51dd0ef72/teenvoguenew.png',
  ],
}

export default lightBlueLayout(MediaHighlights)
