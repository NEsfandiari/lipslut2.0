import React, { Component } from 'react'
import styled from 'styled-components'
import 'animate.css'

const Container = styled.div`
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  img {
    transition: 0.5s;
  }
  .photoCarousel {
    img {
      max-height: 18vh;
      opacity: 0.5;
    }
    display: flex;
    overflow: auto;
  }

  .highlight {
    margin-bottom: 0.6rem;
  }

  @media (max-width: 420px) {
    padding: 0rem;
    width: 98%;
    .photoCarousel {
      overflow: auto;
    }
  }
`

class ProductPhotos extends Component {
  state = {
    highlight: 0,
    animation: false,
  }
  hadnlePhoto = e => {
    this.setState({
      highlight: parseInt(e.target.name),
    })
    e.target.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }

  render() {
    const images = this.props.images.map((image, i) => (
      <img
        src={image}
        alt={'Product Page Image' + i}
        key={i}
        name={i}
        onClick={this.hadnlePhoto}
        style={this.state.highlight === i ? { opacity: 1 } : {}}
      />
    ))
    const highlight = (
      <img
        src={this.props.images[this.state.highlight]}
        alt="Highlighted Image"
        className="highlight animated fadeIn"
      />
    )
    return (
      <Container>
        {highlight}
        <div className="photoCarousel animated slideInRight">{images}</div>
      </Container>
    )
  }
}

export default ProductPhotos
