import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { CheckoutShipping, CheckoutSummary, CheckoutPayment } from './molecules'
import { injectStripe } from 'react-stripe-elements'
import axios from 'axios'
import uuid from 'uuid/v4'
import moment from 'moment'

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
      email: this.props.email,
      firstName: this.props.firstname,
      lastName: this.props.lastname,
      newsletter: this.props.newsletter,
      address: this.props.address_line1,
      apartment: this.props.address_line2,
      city: this.props.address_city,
      zip: this.props.zip,
      state: this.props.address_state,
      phone: this.props.phone,
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
        email: this.props.email,
        city: this.props.address_city,
        address: this.props.address_line1,
        apartment: this.props.address_line2,
        state: this.props.address_state,
        zip: this.props.zip,
        phone: this.props.phone,
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        newsletter: this.props.newsletter,
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({ orderStatus: 'PROCESSING...' })
    const { firebase } = this.context
    try {
      // TODO: Move this functionality to a seperate file and refer here
      // ProcessPayment
      this.props.stripe
        .createToken({
          name: this.state.firstName + ' ' + this.state.lastName,
          address_city: this.state.city,
          address_state: this.state.state,
          address_line1: this.state.address,
          address_line2: this.state.apartment,
          email: this.state.email,
        })
        .then(({ token }) => {
          const stripeAmount =
            parseFloat(
              (
                this.props.tax +
                this.props.subtotal +
                this.state.shipping
              ).toFixed(2)
            ) * 100
          let previousCustomer = null
          if (this.props.curUser && this.props.curUser.data.billing.card) {
            previousCustomer = this.props.curUser.data.billing.card
          }
          // Post to Stripe Lambda Function to process payments
          axios
            .post(
              location.hostname === 'localhost'
                ? 'http://localhost:9000/purchase'
                : `${process.env.GATSBY_LAMBDA_ENDPOINT}purchase`,
              {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  token,
                  amount: stripeAmount,
                  idempotency_key: uuid(),
                  previousCustomer,
                }),
              }
            )
            // Store Stripe Information in the Firebase Database
            .then(res => {
              if (this.props.curUser) {
                firebase
                  .store()
                  .collection('users')
                  .doc(this.props.curUser.id)
                  .update({
                    orderHistory: [
                      ...this.props.curUser.data.orderHistory,
                      {
                        cart: [...this.props.cart],
                        placed: moment().format('MMMM Do YYYY'),
                        total: parseFloat(
                          this.props.tax +
                            this.props.subtotal +
                            this.state.shipping
                        ).toFixed(2),
                        orderNumber: parseInt(Math.random() * 1000),
                      },
                    ],
                    billing: {
                      card:
                        res.data.customerType == 'New'
                          ? res.data.customer.id
                          : res.data.previousCustomer,
                      address_city: this.state.city,
                      address_state: this.state.state,
                      address_line1: this.state.address,
                      address_line2: this.state.apartment,
                      zip: this.state.zip,
                      phone: this.state.phone,
                    },
                    newsletter: this.state.newsletter,
                  })
              }
              this.props.clearCart()
              this.setState({ orderStatus: 'TRANSACTION SUCCESSFUL!' })
            })
        })
    } catch (error) {
      console.log(error)
      this.setState({ orderStatus: 'TRANSACTION DECLINED' })
    }
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
    const total = parseFloat((tax + subtotal + this.state.shipping).toFixed(2))
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
        <CheckoutPayment
          stripe={stripe}
          total={total}
          orderStatus={orderStatus}
        />
      </ContainerForm>
    )
  }
}

export default injectStripe(CheckoutForm)
