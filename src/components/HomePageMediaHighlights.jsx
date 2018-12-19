import React, { Component } from 'react'
import styled from 'styled-components'
import lightBlueLayout from '../layouts/lightBlue'
import 'animate.css'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 7rem;
  .highlight {
    width: 70%;
    text-align: center;
    font-weight: 700;
    height: 7rem;
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
  .animation {
    animation: fadein 1.25s;
    @keyframes fadein {
      from {
        opacity: 0.3;
      }
      to {
        opacity: 1;
      }
    }
  }
  @media (max-width: 1050px) {
    padding: 5rem 2rem;
  }
  @media (max-width: 420px) {
    padding: 3rem 1.5rem;
    .highlight {
      width: 100%;
      font-size: 1.8rem;
    }
    .brandCarousel {
      width: 100%;
      img {
        max-width: 7rem;
      }
    }
  }
`

class MediaHighlights extends Component {
  state = {
    highlight: 0,
    animation: false,
  }
  handleHighlight = e => {
    this.setState({
      highlight: parseInt(e.target.name),
      animation: !this.state.animation,
    })
  }
  render() {
    const animation = `highlight animated ${
      this.state.animation ? 'animation' : 'fadeIn'
    }`
    const highlight = (
      <h1 className="highlight">
        <i className={animation}>{this.props.quotes[this.state.highlight]}</i>
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
