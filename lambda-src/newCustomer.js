require('dotenv').config({ path: '.env.development' })
const stripe = require('stripe')(process.env.GATSBY_STRIPE_SECRET_KEY)
const statusCode = 200
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
}

exports.handler = function(event, context, callback) {
  // TEST for post request
  if (event.httpMethod !== 'POST' || !event.body) {
    callback(null, {
      statusCode,
      headers,
      body: '',
    })
  }
  if (event.body[0] == '{') {
    let data = JSON.parse(event.body)
    data = JSON.parse(data.body)
    data = JSON.parse(data.body)

    stripe.customers
      .create({
        source: data.token.id,
        email: data.token.email,
        shipping: {
          name: data.token.card.name,
          address: {
            line1: data.token.card.address_line1,
            city: data.token.card.address_city,
            state: data.token.card.address_state,
            postal_code: data.token.card.address_zip,
            country: 'US',
          },
        },
      })
      // Create Order with New Customer
      .then(customer => {
        return stripe.orders.create({
          currency: 'usd',
          items: data.items,
          customer: customer.id,
        })
      })
      .then(order => {
        return stripe.orders.pay(
          order.id,
          {
            customer: customer.id,
          },
          {
            idempotency_key: data.idempotency_key,
          }
        )
      })
      .then(order => {
        let status =
          order === null || order.status !== 'paid' ? 'failed' : order.status
        let response = {
          statusCode,
          headers,
          body: JSON.stringify({
            status,
            customer: customer.id,
            customerType: 'New',
          }),
        }
        callback(null, response)
      })
      .catch(err => {
        let response = {
          statusCode: 500,
          headers,
          body: JSON.stringify({
            error: err.message,
          }),
        }
        callback(null, response)
      })
  }
}
