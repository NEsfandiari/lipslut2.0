import React, { Component } from 'react'
import styled from 'styled-components'
import NavLink from './NavLink'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  .dropdown {
    margin: 0;
  }
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: white;
    border-radius: 2px;
    box-shadow: 1px 1px 10px 0 rgba(46, 61, 73, 0.2);
    margin-top: 2rem;
    animation-duration: 0.5s;
    z-index: 3;
    animation: fadein 0.25s;
    @keyframes fadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
  .links {
    display: flex;
    flex-direction: column;
  }
`

class DropdownMenu extends Component {
  state = {
    display: false,
  }
  showMenu = () => {
    this.setState({ display: true })
  }
  hideMenu = () => {
    this.setState({ display: false })
  }

  render() {
    const display = this.state.display ? 'initial' : 'none'
    const links = this.props.links.map(link => (
      <NavLink to={link.page} onClick={link.onClick ? link.onClick : null}>
        {link.text}
      </NavLink>
    ))
    return (
      <Container onMouseLeave={this.hideMenu}>
        <NavLink className="dropdown" onMouseEnter={this.showMenu} to="">
          {this.props.dropdownText}
        </NavLink>
        <div className="dropdown-content" style={{ display: display }}>
          <div className="links">{links}</div>
        </div>
      </Container>
    )
  }
}

export default DropdownMenu
