require('dotenv').config({ path: '.env.development' })
const stripe = require('stripe')(process.env.GATSBY_STRIPE_SECRET_KEY)
const statusCode = 200
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
}

exports.handler = async function(event, context, callback) {
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
  if (!data.token || !data.idempotency_key) {
    console.error('Required information is missing.')
    callback(null, {
      sstatusCode,
      headers,
      body: JSON.stringify({ status: 'missing-information' }),
    })
  }
  if (data.previousCustomer) {
    // Charge Existing Customer
    let order = await stripe.orders
      .create(
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
      .catch(err => {
        console.log(err)
      })

    await stripe.orders
      .pay(order.id, {
        customer: data.previousCustomer,
      })
      .catch(err => {
        console.log(err)
      })

    let status =
      order === null || order.status !== 'created' ? 'failed' : order.status
    callback(null, {
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
    let customer = await stripe.customers
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
      .catch(err => {
        console.log(err)
      })
    // Create Order with New Customer
    let order = await stripe.orders
      .create(
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
      .catch(err => {
        console.log(err)
      })
    await stripe.orders
      .pay(order.id, {
        customer: customer.id,
      })
      .catch(err => {
        console.log(err)
      })
    let status =
      order === null || order.status !== 'created' ? 'failed' : order.status
    callback(null, {
      statusCode,
      headers,
      body: JSON.stringify({
        status,
        previousCustomer: data.previousCustomer,
        customerType: 'New',
      }),
    })
  }
}
