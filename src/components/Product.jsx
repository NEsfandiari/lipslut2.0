import React, { Component } from 'react'
import styled from 'styled-components'

import { StyledHr } from './atoms'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  .photos{
    flex-basis: 50%
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem
  }
  .description{
    flex-basis: 50%
    display: flex;
    flex-direction: column;
    padding: 1rem
  }

  .photoCarousel img{
    max-height: 20vh; 
  }
  .highlight{
  }
`

class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      highlight: 0,
    }
  }
  render() {
    const claims = this.props.claims.map((claim, i) => <p key={i}>{claim}</p>)
    return (
      <Container>
        <div className="photos">
          <img
            src={this.props.images[this.state.highlight]}
            className="highlight"
          />
          <div className="photoCarousel">
            <img src={this.props.images[0]} key={0} />
            <img src={this.props.images[1]} key={1} />
            <img src={this.props.images[2]} key={2} />
          </div>
        </div>
        <div className="description">
          <h1>{this.props.title}</h1>
          {claims}
          <StyledHr width={'100%'} />
        </div>
      </Container>
    )
  }
}

export default Product
