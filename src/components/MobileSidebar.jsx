import React, { Component } from 'react'
import styled from 'styled-components'
import { FaClose } from 'react-icons/lib/fa'
import { LinkButton, StyledHr } from './atoms'
import 'animate.css'

const Container = styled.div`
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-color: #f9f7f1;
  .header {
    display: flex;
    justify-content: space-between;
    width: 80%;
  }
  @media (min-width: 420px) {
    display: none;
  }
`

class MobileSidebar extends Component {
  state = {}
  render() {
    const animation =
      'animated ' + (this.props.display ? 'slideInLeft' : 'slideOutLeft')
    return (
      <Container display={this.props.display} className={animation}>
        <div className="header">
          <h1>Hey</h1>
          <FaClose onClick={this.props.handleMobileSidebar} />
        </div>
      </Container>
    )
  }
}

export default MobileSidebar
