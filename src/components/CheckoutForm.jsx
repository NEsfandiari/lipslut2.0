import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { CheckoutShipping, CheckoutSummary, CheckoutPayment } from './molecules'
import { injectStripe } from 'react-stripe-elements'
import axios from 'axios'
import uuid from 'uuid/v4'

const ContainerForm = styled.form`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 2rem;
  @media (max-width: 1200px) {
    align-items:center
    flex-direction: column;
    height: 215vh
  }
`
class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: props.curUser ? this.props.curUser.data.email : '',
      city: props.curUser ? this.props.curUser.data.billing.address_city : '',
      address: props.curUser
        ? this.props.curUser.data.billing.address_line1
        : '',
      apartment: props.curUser
        ? this.props.curUser.data.billing.address_line2
        : '',
      state: props.curUser ? this.props.curUser.data.billing.address_state : '',
      zip: props.curUser ? this.props.curUser.data.billing.zip : '',
      phone: props.curUser ? this.props.curUser.data.billing.phone : '',
      firstName: props.curUser
        ? this.props.curUser.data.name.split(' ')[0]
        : '',
      lastName: props.curUser ? this.props.curUser.data.name.split(' ')[1] : '',
      newsletter: props.curUser ? this.props.curUser.data.newsletter : false,
      shipping: 4.95,
      orderStatus: 'PLACE ORDER',
      profileLoad: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static contextTypes = {
    firebase: PropTypes.object,
  }

  componentDidUpdate() {
    // SetState to user data if user lands on this page
    if (!this.state.profileLoad && this.props.curUser) {
      this.setState({
        profileLoad: true,
        email: this.props.curUser.data.email,
        city: this.props.curUser.data.billing.address_city,
        address: this.props.curUser.data.billing.address_line1,
        apartment: this.props.curUser.data.billing.address_line2,
        state: this.props.curUser.data.billing.address_state,
        zip: this.props.curUser.data.billing.zip,
        phone: this.props.curUser.data.billing.phone,
        firstName: this.props.curUser.data.name.split(' ')[0],
        lastName: this.props.curUser.data.name.split(' ')[1],
        newsletter: this.props.curUser.data.newsletter,
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({ orderStatus: 'PROCESSING...' })
    let previousCustomer = null
    if (this.props.curUser && this.props.curUser.data.billing.card) {
      previousCustomer = this.props.curUser.data.billing.card
    }
    // Create Stripe Token from Stripe React elements
    this.props.stripe
      .createToken({
        name: this.state.firstName + ' ' + this.state.lastName,
        address_city: this.state.city,
        address_state: this.state.state,
        address_line1: this.state.address,
        address_line2: this.state.apartment,
        email: this.state.email,
      })
      // Post to lambda Function
      .then(({ token }) => {
        axios.post(
          location.hostname === 'localhost'
            ? 'http://localhost:9000/purchase'
            : `${process.env.GATSBY_LAMBDA_ENDPOINT}purchase`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              token,
              idempotency_key: uuid(),
              previousCustomer,
            }),
          }
        )
      })
      .then(res => {
        console.log(res)
        const { firebase } = this.context
        const { curUser, cart, subtotal, tax } = this.props
        const {
          city,
          address,
          state,
          apartment,
          zip,
          phone,
          newsletter,
          shipping,
        } = this.state
        const total = parseFloat(tax + subtotal + shipping).toFixed(2)
        // Store Stripe Information in the Firebase Database
        if (curUser) {
          firebase.updatePayment(
            res,
            curUser,
            cart,
            total,
            city,
            state,
            address,
            apartment,
            zip,
            phone,
            newsletter
          )
        }
        this.props.clearCart()
        this.setState({ orderStatus: 'TRANSACTION SUCCESSFUL!' })
      })
      .catch(error => {
        console.error(error)
        this.setState({ orderStatus: 'TRANSACTION DECLINED' })
      })
  }

  handleChange(e) {
    if (e.target.type == 'checkbox') {
      this.setState({
        [e.target.name]: e.target.checked,
      })
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      })
    }
  }

  render() {
    const { cart, addItem, subtotal, tax, stripe } = this.props
    const {
      shipping,
      orderStatus,
      email,
      city,
      address,
      apartment,
      state,
      zip,
      phone,
      firstName,
      lastName,
      newsletter,
    } = this.state
    return (
      <ContainerForm onSubmit={this.handleSubmit}>
        <CheckoutShipping
          handleChange={this.handleChange}
          email={email}
          city={city}
          address={address}
          apartment={apartment}
          state={state}
          firstName={firstName}
          lastName={lastName}
          zip={zip}
          phone={phone}
          newsletter={newsletter}
        />
        <CheckoutSummary
          cart={cart}
          addItem={addItem}
          subtotal={subtotal}
          tax={tax}
          shipping={shipping}
        />
        <CheckoutPayment stripe={stripe} orderStatus={orderStatus} />
      </ContainerForm>
    )
  }
}

export default injectStripe(CheckoutForm)
