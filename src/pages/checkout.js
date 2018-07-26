import React, { Component } from 'react'
import styled from 'styled-components'
import uuid from 'uuid/v4'

const Container = styled.div`
    display: flex;
    align-items: center;

    .card {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
        padding: 3rem;
        box-shadow: 5px 5px 25px 0 rgba(46,61,73,.2);
        background-color: #fff;
        border-radius: 6px;
        max-width: 400px;
    }
    button{
        font-Size: 13px;
        text-Align: center;
        color: #fff;
        outline: none;
        padding: 12px 60px;
        box-Shadow: 2px 5px 10px rgba(0,0,0,.1);
        background-Color: rgb(255, 178, 56);
        border-Radius: 6px;
        letter-Spacing: 1.5px;
    }
`
const amount = 2500
class Checkout extends Component {
  state = {
    disabled: false,
    buttonText: 'BUY NOW',
    paymentMessage: '',
  }

  componentDidMount() {
    debugger
    this.stripeHandler = StripeCheckout.configure({
      key: process.env.STRIPE_PUBLIC_KEY,
      closed: () => {
        this.resetButton()
      },
    })
  }

  resetButton() {
    this.setState({ disabled: false, buttonText: 'BUY NOW' })
  }

  openStripeCheckout(event) {
    event.preventDefault()
    this.setState({ disabled: true, buttonText: 'WAITING...' })
    this.stripeHandler.open({
      name: 'Demo Product',
      amount: amount,
      description: 'A product well worth your time',
      token: token => {
        fetch(`${process.env.LAMBDA_ENDPOINT}purchase`, {
          method: 'POST',
          body: JSON.stringify({
            token,
            amount,
            idempotency_key: uuid(),
          }),
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
        })
          .then(res => {
            console.log('Transaction processed successfully')
            this.resetButton()
            this.setState({ paymentMessage: 'Payment Successful!' })
            return res.json()
          })
          .catch(error => {
            console.error('Error:', error)
            this.setState({ paymentMessage: 'Payment Failed' })
          })
      },
    })
  }
  render() {
    return (
      <Container>
        <div className="card">
          <h4>Shipping!</h4>
          <p>
            Use any email, 4242 4242 4242 4242 as the credit card number, any 3
            digit number, and any future date of expiration.
          </p>
          <button
            onClick={event => this.openStripeCheckout(event)}
            disabled={this.state.disabled}
          >
            {this.state.buttonText}
          </button>
          {this.state.paymentMessage}
        </div>
      </Container>
    )
  }
}

export default Checkout
