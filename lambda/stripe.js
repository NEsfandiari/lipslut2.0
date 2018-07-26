// const stripe = require('stripe')(process.env.STRIPE_KEY)
// console.log(process.env.STRIPE_KEY)

module.exports.handler = function(e, context, cb) {
  callback(null, {
    statusCode: 200,
    body: 'Hello, World',
  })
}

// exports.handler = function(event, context, callback) {
// const headers = {
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Headers': 'Content-Type',
// }
// const statusCode = 200
//   // your server-side functionality
//   if (event.httpMethod !== 'POST' || !event.body) {
//     callback(null, {
//       statusCode,
//       headers,
//       body: '',
//     })
//   }

//   const data = JSON.parse(event.body)
//   console.log(event)
//   console.log(data)

//   if (!data.token || !data.amount || !data.idempotency_key) {
//     console.error('Required information is missing.')

//     callback(null, {
//       statusCode,
//       headers,
//       body: JSON.stringify({ status: 'missing-information' }),
//     })
//     return
//   }

//   const amount = data.amount
//   const token = data.token.id

//   return stripe.charges.create(
//     {
//       // Create Stripe charge with token
//       amount,
//       source: token,
//       currency: 'usd',
//       description: 'Serverless test Stripe charge',
//     },
//     {
//       idempotency_key: data.idempotency_key,
//     },
//     (err, charge) => {
//       if (err !== null) {
//         console.log(err)
//       }

//       let status =
//         charge === null || charge.status !== 'succeeded'
//           ? 'failed'
//           : charge.status

//       callback(null, {
//         statusCode,
//         headers,
//         body: JSON.stringify({ status }),
//       })
//     }
//   )
// }
