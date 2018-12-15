import React, { Component } from 'react'
import Styled from 'styled-components'

const Container = Styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 4rem;
  padding: 4rem;
  div{
      display: flex;
      flex-direction:column;
      align-items: center;
  }
  h1{
      font-size: 3.5rem;
  }
  p{
    font-size: .9rem;
    text-align: center;
  }
  .slogans{
      flex-basis: 40%;
  }
  .philosophy{
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    flex-basis: 60%;
    p{
      width: 80%;
    }
  }
  @media (max-width: 420px) {
    padding:0;
    h1{
      font-size: 2rem;
    }
    flex-direction: column;
  }
`
class MissionPhilosophy extends Component {
  render() {
    let slogans = []
    let phil = []
    this.props.philosophyCopy.forEach((line, i) => {
      if (line.nodeType === 'heading-1')
        slogans.push(<h1 key={i}>{line.content[0].value}</h1>)
      else phil.push(<p key={i}>{line.content[0].value}</p>)
    })
    return (
      <Container>
        <div className="slogans">{slogans}</div>
        <div className="philosophy">{phil}</div>
      </Container>
    )
  }
}

export default MissionPhilosophy
