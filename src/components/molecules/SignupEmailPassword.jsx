import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { navigateTo } from 'gatsby-link'
import { StyledInput, StyledButton } from '../atoms'

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  .name {
    display: flex;
    justify-content: space-between;
    width: 17rem;
  }
  .checkbox {
    margin-top: 0.4rem;
    display: flex;
    justify-content: center;
    width: 17rem;
  }
`

class SignupEmailPassword extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    newsletter: false,
  }
  static contextTypes = {
    firebase: PropTypes.object,
  }
  handleChange = e => {
    if (e.target.type == 'checkbox') {
      this.setState({
        [e.target.name]: e.target.checked,
      })
    } else {
      debugger
      this.setState({
        [e.target.name]: e.target.value,
      })
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    const { firebase } = this.context
    const signup = this
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        const userInfo = user.user
        if (this.state.newsletter) {
          firebase
            .store()
            .collection('emails')
            .add({ email: this.state.email })
        }
        firebase
          .store()
          .collection('users')
          .doc(userInfo.uid)
          .set({
            name: this.state.firstName + ' ' + this.state.lastName,
            email: this.state.email,
            newsletter: this.state.newsletter,
            orderHistory: [],
            billing: {
              email: '',
              address_city: '',
              address_line1: '',
              address_line2: '',
              address_state: '',
              firstName: '',
              lastName: '',
              zip: '',
              phone: '',
              card: '',
            },
          })
      })
      .then(() => navigateTo('/'))
      .catch(function(error) {
        const errorMessage = error.message
        signup.props.handleError(errorMessage)
      })
  }
  render() {
    return (
      <Container onSubmit={this.handleSubmit}>
        <div className="name">
          <StyledInput
            type="text"
            width="8rem"
            placeholder="First Name"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
          <StyledInput
            type="text"
            width="8rem"
            placeholder="Last Name"
            name="lastName"
            onChange={this.handleChange}
            value={this.state.lastName}
          />
        </div>
        <StyledInput
          type="email"
          placeholder="Email"
          name="email"
          onChange={this.handleChange}
          value={this.state.email}
        />
        <StyledInput
          placeholder="Password"
          name="password"
          onChange={this.handleChange}
          value={this.state.password}
        />
        <StyledButton width="17rem" height="2rem" margin="0">
          SIGN UP
        </StyledButton>
        <div className="checkbox">
          <StyledInput
            width="2rem"
            type="checkbox"
            onClick={this.handleChange}
            value={this.state.newsletter}
            name="newsletter"
          />
          <label> I'd like to hear from Lipslut</label>
        </div>
      </Container>
    )
  }
}

export default SignupEmailPassword
