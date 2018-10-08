require('dotenv').config({ path: '.env.development' })
const axios = require('axios')
import gql from 'graphql-tag'
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
  context.callbackWaitsForEmptyEventLoop = false
  // TEST for post request
  if (event.httpMethod !== 'POST' || !event.body) {
    callback(null, {
      statusCode,
      headers,
      body: '',
    })
  }
  // TEST if the event body has data relevant to be parsed. Is valid post request
  if (event.body[0] == '{') {
    let data = JSON.parse(event.body)
    data = JSON.parse(data.body)
    const query = gql`
      mutation checkoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
          checkout {
            id
            webUrl
          }
          checkoutUserErrors {
            field
            message
          }
        }
      }
    `
    const variables = {
      input: { lineItems: data.items },
    }
    try {
      const checkoutData = await axios({
        url: 'https://lipslut2-0.myshopify.com/api/graphql',
        method: 'POST',
        headers: shopifyConfig,
        body: { query, variables },
      })
      console.log(checkoutData, '1')
      let response = {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          data: checkoutData.data,
        }),
      }
      callback(null, response)
    } catch (err) {
      console.log(err, '3')
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
