import React, { Component } from 'react'
import styled from 'styled-components'

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
      padding: 1.1rem;
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
  handleFade = e => {
    debugger
    e.target.classList.add('fadeIn')
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
        className="animated"
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
