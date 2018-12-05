import React, { Component } from 'react'
import Styled from 'styled-components'
import DVStates from './DVStates'

const Container = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: .5rem;
    .button:hover{
        b{
          color:white;
        }
      }
    h2 {
      font-size: 2rem;
    }
    b{
      color: #FF0086;   
    }
`

class DataVis extends Component {
  render() {
    // const { title, image, route } = this.props
    return (
      <Container className="DataVis">
        <DVStates />
        {/* add charity line graph component
        add user spending chart component */}
      </Container>
    )
  }
}

export default DataVis
