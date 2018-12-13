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

let updateAccountResponse

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

    // get customerAccessToken
    const payload1 = {
      query: `mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          userErrors {
            field
            message
          }
          customerAccessToken {
            accessToken
            expiresAt
          }
          customerUserErrors {
            field
            message
          }
        }
      }
      `,
      variables: {
        input: {
          email: data.email,
          password: data.uid,
        },
      },
    }
    let token
    try {
      token = await axios({
        url: 'https://lipslut2-0.myshopify.com/api/graphql',
        method: 'POST',
        headers: shopifyConfig,
        data: JSON.stringify(payload1),
      })

      updateAccountResponse = token.data.data

      if (token.data.data.customerAccessTokenCreate.userErrors.length > 0)
        throw token.data.data.customerAccessTokenCreate.userErrors
      else
        token =
          token.data.data.customerAccessTokenCreate.customerAccessToken
            .accessToken
    } catch (err) {
      console.log(err[0])
      let response = {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: err[0],
        }),
      }
      callback(null, response)
    }

    console.log('updateAccountResponse is: ', updateAccountResponse)

    // update customer data
  }
}
