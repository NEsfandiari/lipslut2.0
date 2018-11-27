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
    height: 5rem;
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
    const brands = this.props.logos.map((image, i) => (
      <img
        src={image.fluid.src}
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

export default lightBlueLayout(MediaHighlights)
