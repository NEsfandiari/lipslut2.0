require('dotenv').config({ path: '.env.development' })
const axios = require('axios')
const statusCode = 200
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
}
const shopifyConfig = {
  'Content-Type': 'application/json',
  'X-Shopify-Storefront-Access-Token':
    process.env.GATSBY_SHOPIFY_STOREFRONT_KEY,
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

    const payload = {
      query: `mutation customerCreate($input: CustomerCreateInput!) {
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
          email: data.email,
          password: data.uid,
          acceptsMarketing: data.newsletter,
          firstName: data.firstName,
          lastName: data.lastName,
        },
      },
    }

    try {
      let customer = await axios({
        url: 'https://lipslut2-0.myshopify.com/api/graphql',
        method: 'POST',
        headers: shopifyConfig,
        data: JSON.stringify(payload),
      })
      console.log(customer.data)
      if (customer.data.errors) customer = customer.data.errors
      else customer = customer.data.data.customerCreate
      let response = {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          customer,
        }),
      }
      callback(null, response)
    } catch (err) {
      console.log(err)
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
