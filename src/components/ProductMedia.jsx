import React, { Component } from 'react'
import styled from 'styled-components'
import 'animate.css'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #E9F7F8;
  width:100vw;
  padding: 5rem;
  a{
      margin-left: 1rem;
      max-width: 10rem;
  }
  img{
      padding: .5rem;
      margin: 0;
  }
  .sellingPoints{
      flex-basis: 50%
  }
  .media{
    flex-basis: 50%;
    padding-left: 1rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
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
    console.log(window.scrollY)
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
