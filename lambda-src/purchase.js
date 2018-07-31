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
  console.log(data)

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

  // Actual function
  stripe.charges.create(
    {
      currency: 'usd',
      amount: data.amount,
      source: data.token.id,
      description: `Receipt from Lipslut LLC`,
      receipt_email: data.token.email,
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
        body: JSON.stringify({ status }),
      })
    }
  )
}
