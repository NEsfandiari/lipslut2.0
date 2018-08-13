require('dotenv').config({ path: '.env.development' })
const stripe = require('stripe')(process.env.GATSBY_STRIPE_SECRET_KEY)

exports.handler = async function purchase(event, context, callback) {
  const statusCode = 200
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
  // TEST for post request
  if (event.httpMethod !== 'POST' || !event.body) {
    callback(null, {
      statusCode,
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
      statusCode,
      headers,
      body: JSON.stringify({ status: 'missing-information' }),
    })
    return
  }
  try {
    if (data.previousCustomer) {
      // Charge Existing Customer
      let order = await stripe.orders.create(
        {
          currency: 'usd',
          items: [
            {
              type: 'sku',
              parent: 'sku_DOW0toLrcYwVDG',
              quantity: 1,
            },
          ],
          customer: data.previousCustomer,
        },
        {
          idempotency_key: data.idempotency_key,
        }
      )
      let status =
        order === null || order.status !== 'created' ? 'failed' : order.status
      callback('Its Broken', {
        statusCode,
        headers,
        body: JSON.stringify({
          status,
          previousCustomer: data.previousCustomer,
          customerType: 'Old',
        }),
      })
    } else {
      // Create A New Customer
      let customer = await stripe.customers.create({
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
      let order = await stripe.orders.create(
        {
          currency: 'usd',
          items: [
            {
              type: 'sku',
              parent: 'sku_DOW0toLrcYwVDG',
              quantity: 1,
            },
          ],
          customer: customer.id,
        },
        {
          idempotency_key: data.idempotency_key,
        }
      )

      let status =
        order === null || order.status !== 'created' ? 'failed' : order.status
      callback('Its Broken', {
        statusCode,
        headers,
        body: JSON.stringify({
          status,
          previousCustomer: data.previousCustomer,
          customerType: 'New',
        }),
      })
    }
  } catch (err) {
    console.log(err)
  }
}
