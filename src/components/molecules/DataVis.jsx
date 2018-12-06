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
    return (
      <Container className="DataVis">
        <DVStates ordersData={this.props.ordersData} />
        {/* add charity line graph component
        add user spending chart component */}
      </Container>
    )
  }
}

export default DataVis
