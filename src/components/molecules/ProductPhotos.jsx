import React, { Component } from 'react'
import styled from 'styled-components'
import 'animate.css'

const Container = styled.div`
    flex-basis: 50%
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    img {
    transition: 0.5s;
  }
    .photoCarousel img{
        max-height: 20vh; 
        opacity: .5;
    }
    .highlight{
    margin-bottom: .6rem;
  }
`

class ProductPhotos extends Component {
  state = {
    highlight: 0,
  }
  hadnlePhoto = e => {
    this.setState({ highlight: parseInt(e.target.name) })
  }

  render() {
    const images = this.props.images.map((image, i) => (
      <img
        src={image}
        key={i}
        name={i}
        onClick={this.hadnlePhoto}
        style={this.state.highlight === i ? { opacity: 1 } : {}}
      />
    ))
    const highlight = (
      <img
        src={this.props.images[this.state.highlight]}
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
