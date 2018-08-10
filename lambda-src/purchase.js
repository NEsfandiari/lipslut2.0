require('dotenv').config({ path: '.env.development' })

const stripe = require('stripe')(process.env.GATSBY_STRIPE_SECRET_KEY)
let statusCode = 200
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

  let data = JSON.parse(event.body)
  data = JSON.parse(data.body)

  // TEST for all necessary data
  if (!data.token || !data.amount || !data.idempotency_key) {
    console.error('Required information is missing.')
    callback(null, {
      statusCode,
      headers,
      body: JSON.stringify({ status: 'missing-information' }),
    })
    return
  }
  if (data.previousCustomer) {
    // Create Order
    stripe.orders
      .create({
        currency: 'usd',
        email: data.token.email,
        items: [
          {
            type: 'sku',
            parent: 'sku_DOW0toLrcYwVDG',
            quantity: 1,
          },
        ],
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
      .then(() => {
        stripe.charges.create(
          {
            currency: 'usd',
            amount: data.amount,
            customer: data.previousCustomer,
          },
          {
            idempotency_key: data.idempotency_key,
          },
          (err, charge) => {
            if (err !== null) {
              console.log(err)
            }

            let status =
              charge === null || charge.status !== 'succeeded'
                ? 'failed'
                : charge.status
            // TODO Figure Out WHy this is not responding to checkoutForm with data
            callback(null, {
              statusCode,
              headers,
              body: JSON.stringify({
                status,
                previousCustomer: data.previousCustomer,
                customerType: 'Old',
              }),
            })
          }
        )
      })
    // Charge Existing Customer
  } else {
    // Create A New Customer and Charge Him/her
    stripe.customers
      .create({
        source: data.token.id,
        email: data.token.email,
      })
      .then(customer => {
        stripe.charges.create(
          {
            currency: 'usd',
            amount: data.amount,
            customer: customer.id,
          },
          {
            idempotency_key: data.idempotency_key,
          },
          (err, charge) => {
            if (err !== null) {
              console.log(err)
            }

            let status =
              charge === null || charge.status !== 'succeeded'
                ? 'failed'
                : charge.status
            callback(null, {
              statusCode,
              headers,
              body: JSON.stringify({ status, customer, customerType: 'New' }),
            })
          }
        )
      })
  }
}
