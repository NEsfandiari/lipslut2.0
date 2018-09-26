import React, { Component } from 'react'
import styled from 'styled-components'
import NavLink from './NavLink'
import { FaChevronDown, FaChevronUp } from 'react-icons/lib/fa'
import 'animate.css'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  svg {
    animation-duration: 0.25s;
  }
  .dropdown {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .dropdown-content {
    display: none;
    position: relative;
    background-color: #f2f6f6;
    border-radius: 2px;
    box-shadow: 1px 1px 5px 0 rgba(46, 61, 73, 0.2);
    animation-duration: 0.5s;
    width: 110%;
    right: 5%;
  }
  .links {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    padding-left: 1rem;
  }
`

class DropdownMenu extends Component {
  state = {
    display: false,
  }
  handleClick = () => {
    this.props.handleMobileSidebar()
    this.handleMenu()
  }
  handleMenu = () => {
    const newState = !this.state.display
    this.setState({ display: newState })
  }
  render() {
    const display = this.state.display ? 'flex' : 'none'
    const links = this.props.links.map(link => (
      <NavLink to={link.page}>{link.text}</NavLink>
    ))
    return (
      <Container>
        <NavLink className="dropdown" onClick={this.handleMenu}>
          {this.props.dropdownText}
          {this.state.display ? (
            <FaChevronUp className="animated rotateInDownLeft" color="black" />
          ) : (
            <FaChevronDown className="animated rotateInUpLeft" color="black" />
          )}
        </NavLink>
        <div
          className="dropdown-content animated fadeInUp"
          style={{ display: display }}
        >
          <div className="links" onClick={this.handleClick}>
            {links}
          </div>
        </div>
      </Container>
    )
  }
}

export default DropdownMenu
