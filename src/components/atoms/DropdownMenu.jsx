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
    padding: 0.5rem;
    animation-duration: 0.5s;
    z-index: 3;
    a {
      padding: 0.2rem;
    }
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
  constructor(props) {
    super(props)
    this.myRefs = this.props.links.map(link => React.createRef())
    this.state = { display: false }
    this.focus = this.focus.bind(this)
  }

  //for accessibility --> called to programmatically move focus to next item in Dropdown Menu
  //needed so screen reader can follow focus when navigating with keyboard
  focus(focusTarget) {
    focusTarget.focus()
  }

  showMenu = () => {
    this.setState({ display: true })
  }

  hideMenu = () => {
    this.setState({ display: false })
  }

  toggleMenu(focusTarget) {
    this.setState(
      st => ({
        display: !st.display,
      }),
      () => {
        if (focusTarget) this.focus(focusTarget)
      }
    )
  }

  render() {
    const display = this.state.display ? 'initial' : 'none'
    const links = this.props.links.map((link, i, array) => {
      return (
        <NavLink
          to={link.route}
          onClick={link.name === 'Log Out' ? this.props.logOut : null}
          // browser gives warning about innerRef (says it should be ref), but ref does not work
          // innerRef is used because NavLink renders a gatsby Link: documentation here: https://www.gatsbyjs.org/docs/gatsby-link/
          innerRef={el => (this.myRefs[i] = el)}
          key={i}
          //adds keyboard navigation to navbar dropdown links
          onKeyDown={e => {
            if (e.key === 'ArrowDown' && i !== array.length - 1) {
              this.focus(this.myRefs[i + 1])
            } else if (e.key === 'ArrowUp' && i !== 0) {
              this.focus(this.myRefs[i - 1])
            } else if (e.key === 'ArrowDown') {
              this.focus(this.myRefs[0])
            } else if (e.key === 'ArrowUp') {
              this.focus(this.myRefs[array.length - 1])
            } else if (e.key === 'Escape' || e.key === 'Enter') {
              this.toggleMenu()
            }
          }}
        >
          {link.name}
        </NavLink>
      )
    })

    return (
      <Container onMouseLeave={this.hideMenu}>
        <NavLink
          className="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded={this.state.display}
          onKeyDown={e => {
            if (this.state.display === false) {
              if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                this.toggleMenu(this.myRefs[0])
              } else if (e.key === 'ArrowUp') {
                this.toggleMenu(this.myRefs[this.myRefs.length - 1])
              }
            } else {
              if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
                this.toggleMenu()
              }
            }
          }}
          onMouseEnter={this.showMenu}
          to=""
        >
          {this.props.dropdownText}
        </NavLink>
        <div className="dropdown-content" style={{ display }}>
          <div className="links">{links}</div>
        </div>
      </Container>
    )
  }
}

export default DropdownMenu
