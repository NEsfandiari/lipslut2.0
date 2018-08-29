import React, { Component } from 'react'
import styled from 'styled-components'
import 'animate.css'

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #e9f7f8;
  width: 100%;
  padding: 4.5rem;
  a {
    margin-left: 1rem;
    max-width: 9rem;
  }
  img {
    padding: 0.5rem;
    margin: 0;
  }
  .sellingPoints {
    flex-basis: 50%;
    max-width: 600px;
  }
  .media {
    flex-basis: 50%;
    justify-content: center;
    padding-left: 1rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    max-width: 600px;
  }
  @media (max-width: 420px) {
    flex-direction: column;
    padding: 1rem;
    a {
      margin: 0.3rem;
      max-width: 8rem;
    }
    .media {
      padding: 0;
      justify-content: space-between;
    }
  }
`
class ProductMedia extends Component {
  state = {
    display: 'none',
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleFade)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleFade)
  }

  handleFade = e => {
    if (window.scrollY > 600) {
      this.setState({ display: 'initial' })
    }
  }
  render() {
    const sellingPoints = this.props.sellingPoints.map((point, i) => (
      <div key={i}>
        <h3>{point.headline}</h3>
        <p>{point.description}</p>
      </div>
    ))
    const media = this.props.media.map((media, i) => (
      <a
        href={media.link}
        key={i}
        className="animated fadeIn"
        style={{
          display: this.state.display,
        }}
        onScroll={this.handleFade}
        target="_blank"
      >
        <img src={media.image} alt="" />
      </a>
    ))
    return (
      <Container>
        <div className="sellingPoints">{sellingPoints}</div>
        <div className="media">{media}</div>
      </Container>
    )
  }
}

export default ProductMedia
