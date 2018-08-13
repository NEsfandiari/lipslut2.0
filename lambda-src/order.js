require('dotenv').config({ path: '.env.development' })

const stripe = require('stripe')(process.env.GATSBY_STRIPE_SECRET_KEY)
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
}

exports.handler = function(event, context, callback) {
  if (event.httpMethod !== 'POST' || !event.body) {
    callback(null, {
      statusCode: 200,
      headers,
      body: '',
    })
    return
  }

  let data = JSON.parse(event.body)
  data = JSON.parse(data.body)

  // TEST for all necessary data
  if (!data.token || !data.amount || !data.idempotency_key) {
    console.error('Required information is missing.')
    callback(null, {
      statusCode: 200,
      headers,
      body: JSON.stringify({ status: 'missing-information' }),
    })
    return
  }
  try {
    stripe.orders.create({
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
  } catch (e) {
    console.log(e)
  }
}
