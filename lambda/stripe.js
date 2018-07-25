const stripe = require('stripe')('sk_test_oM9uhMtxBAYcopS1CjVpl94i')
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
}
exports.handler = function(event, context, callback) {
  // your server-side functionality

  console.log(event)
  const requestData = JSON.parse(event.body)
  console.log(requestData)
  const amount = requestData.amount
  const token = requestData.token.id

  return stripe.charges
    .create({
      // Create Stripe charge with token
      amount,
      source: token,
      currency: 'usd',
      description: 'Serverless test Stripe charge',
    })
    .then(charge => {
      // Success response
      console.log(charge)
      const response = {
        headers,
        statusCode: 200,
        body: JSON.stringify({
          message: `Charge processed!`,
          charge,
        }),
      }
      callback(null, response)
    })
    .catch(err => {
      // Error response
      console.log(err)
      const response = {
        headers,
        statusCode: 500,
        body: JSON.stringify({
          error: err.message,
        }),
      }
      callback(null, response)
    })
}
