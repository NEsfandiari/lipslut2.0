import React, { Component } from 'react'
import styled from 'styled-components'
import { Shipping, Summary, Payment } from './molecules'
import { injectStripe } from 'react-stripe-elements'
import { navigateTo } from 'gatsby-link'
import axios from 'axios'
import uuid from 'uuid/v4'

const ContainerForm = styled.form`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 2rem;
`
class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      newsletter: '',
      address: '',
      apartment: '',
      city: 'CA',
      zip: '',
      state: '',
      phone: '',
      shipping: 4.95,
      orderMessage: 'PLACE ORDER',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({ orderMessage: 'PROCESSING...' })
    try {
      this.props.stripe
        .createToken({
          name: this.state.firstName + ' ' + this.state.lastName,
          address_city: this.state.city,
          address_state: this.state.state,
          address_line1: this.state.address,
          address_line2: this.state.apartment,
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
                }),
              }
            )
            .then(res => {
              console.log(res)
              this.props.clearCart()
              this.setState({ orderMessage: 'TRANSACTION SUCCESSFUL!' })
            })
        })
    } catch (error) {
      console.log(error)
      this.setState({ orderMessage: 'TRANSACTION DECLINED' })
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    const { cart, addItem, subtotal, tax, stripe } = this.props
    const { shipping, orderMessage } = this.state
    const total = parseFloat((tax + subtotal + this.state.shipping).toFixed(2))
    return (
      <ContainerForm onSubmit={this.handleSubmit}>
        <Shipping handleChange={this.handleChange} />
        <Summary
          cart={cart}
          addItem={addItem}
          subtotal={subtotal}
          tax={tax}
          shipping={shipping}
        />
        <Payment stripe={stripe} total={total} orderMessage={orderMessage} />
      </ContainerForm>
    )
  }
}

export default injectStripe(CheckoutForm)
