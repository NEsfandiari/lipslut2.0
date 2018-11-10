require('dotenv').config({ path: '.env.development' })
const axios = require('axios')
const statusCode = 200
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
}
const shopifyConfig = {
  'Content-Type': 'application/graphql',
  'X-Shopify-Access-Token': process.env.GATSBY_SHOPIFY_STOREFRONT_KEY,
}
exports.handler = async function(event, context, callback) {
  // TEST for POST request
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
    const payload = {
      query: ` mutation customerCreate($input: CheckoutCreateInput!) {
          customerCreate(input: $input) {
            userErrors {
              field
              message
            }
            customer {
              id
            }
            customerUserErrors {
              field
              message
            }
          }
        }`,
      variables: {
        input: {
          acceptsMarketing: true,
          email: data.token.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phoneNumber,
        },
      },
    }

    try {
      let customerId = await axios({
        url: 'https://lipslut2-0.myshopify.com/api/graphql',
        method: 'POST',
        headers: shopifyConfig,
        data: JSON.stringify(payload),
      })
      customerId = customerId.data.data.customerCreate.customer.id
      let status =
        customer === null || order.status !== 'paid' ? 'failed' : order.status
      let response = {
        statusCode,
        headers,
        body: JSON.stringify({
          status,
          customer: order.customer,
          customerType: 'New',
        }),
      }
      callback(null, response)
    } catch (err) {
      let response = {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: err.message,
        }),
      }
      callback(null, response)
    }
  }
}
