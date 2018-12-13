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
    this.dropdown = React.createRef()
    this.focus = this.focus.bind(this)
  }
  state = {
    display: false,
  }
  showMenu = () => {
    this.setState({ display: true })
  }
  hideMenu = () => {
    this.setState({ display: false })
  }
  focus() {
    console.log('focus ran! ', this.dropdown.current)
    this.innerRef.focus()
  }

  toggleMenu() {
    console.log('toggling!')
    this.setState(st => ({
      display: !st.display,
    }))
  }

  render() {
    console.log('here are mahh refs: ', this.dropdown)
    const display = this.state.display ? 'initial' : 'none'
    const links = this.props.links.map((link, i) => (
      <NavLink
        to={link.route}
        onClick={link.name === 'Log Out' ? this.props.logOut : null}
        key={i}
        innerRef={el => (this.innerRef = el)}
      >
        {link.name}
      </NavLink>
    ))
    return (
      <Container
        onMouseLeave={this.hideMenu}
        role="button"
        onKeyDown={e => {
          console.log('trying these: ', e.key)
          if (e.key === 'Enter' || e.key === ' ') {
            this.toggleMenu()
            this.focus()
          }
        }}
        role="button"
        onBlur={() => {
          console.log('i am working')
          this.hideMenu()
        }}
      >
        <NavLink className="dropdown" onMouseEnter={this.showMenu} to="">
          {this.props.dropdownText}
        </NavLink>
        <div className="dropdown-content" style={{ display }}>
          <div className="links">{links}</div>
        </div>
      </Container>
    )
  }
}

// class DropdownMenu extends React.Component {
//   constructor(props) {
//     super(props)

//     this.state = { isOpen: false }
//     this.timeOutId = null

//     this.onClickHandler = this.onClickHandler.bind(this)
//     this.onBlurHandler = this.onBlurHandler.bind(this)
//     this.onFocusHandler = this.onFocusHandler.bind(this)
//   }

//   onClickHandler() {
//     this.setState(currentState => ({
//       isOpen: !currentState.isOpen,
//     }))
//   }

//   // We close the popover on the next tick by using setTimeout.
//   // This is necessary because we need to first check if
//   // another child of the element has received focus as
//   // the blur event fires prior to the new focus event.
//   onBlurHandler() {
//     this.timeOutId = setTimeout(() => {
//       this.setState({
//         isOpen: false,
//       })
//     })
//   }

//   // If a child receives focus, do not close the popover.
//   onFocusHandler() {
//     clearTimeout(this.timeOutId)
//   }

//   render() {
//     // React assists us by bubbling the blur and
//     // focus events to the parent.
//     return (
//       <div onBlur={this.onBlurHandler} onFocus={this.onFocusHandler}>
//         <button
//           onClick={this.onClickHandler}
//           aria-haspopup="true"
//           aria-expanded={this.state.isOpen}
//         >
//           Select an option
//         </button>
//         {this.state.isOpen ? (
//           <ul>
//             <li>Option 1</li>
//             <li>Option 2</li>
//             <li>Option 3</li>
//           </ul>
//         ) : null}
//       </div>
//     )
//   }
// }

export default DropdownMenu
