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
    //  TODO: use async await for readibility
    stripe.orders
      .create({
        currency: 'usd',
        items: data.items,
        customer: data.previousCustomer,
      })
      .then(order => {
        // return promise to use .then's at the same nesting lvl
        stripe.orders
          .pay(
            order.id,
            {
              customer: data.previousCustomer,
            },
            {
              idempotency_key: data.idempotency_key,
            }
          )
          .then(order => {
            let status =
              order === null || order.status !== 'paid'
                ? 'failed'
                : order.status
            let response = {
              statusCode,
              headers,
              body: JSON.stringify({
                status,
                previousCustomer: data.previousCustomer,
                customerType: 'Old',
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
      })
      .catch(err => {
        console.log(err)
      })
  }
}
