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
    const payload1 = {
      query: `mutation checkoutCreate($input: CheckoutCreateInput!) {
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
          }`,
      variables: { input: { lineItems: data.items } },
    }
    let checkoutData
    try {
      checkoutData = await axios({
        url: 'https://lipslut2-0.myshopify.com/api/graphql',
        method: 'post',
        headers: shopifyConfig,
        data: JSON.stringify(payload1),
      })
      checkoutData = checkoutData.data.data.checkoutCreate.checkout
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

    // IF the user has an account ASK shopify for a customeraccesstoken and asscoiate the checkout with the account
    if (!data.hasAccount) {
      let response = {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          data: checkoutData,
        }),
      }
      callback(null, response)
    } else {
      const payload2 = {
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
            email: data.user.email,
            password: data.user.uid,
          },
        },
      }
      let token
      try {
        token = await axios({
          url: 'https://lipslut2-0.myshopify.com/api/graphql',
          method: 'POST',
          headers: shopifyConfig,
          data: JSON.stringify(payload2),
        })
        token =
          token.data.data.customerAccessTokenCreate.customerAccessToken
            .accessToken
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
      const payload3 = {
        query: `mutation checkoutCustomerAssociateV2($checkoutId: ID!, $customerAccessToken: String!) {
          checkoutCustomerAssociateV2(checkoutId: $checkoutId, customerAccessToken: $customerAccessToken) {
            userErrors {
              field
              message
            }
            checkout {
              id
            }
            customer {
              id
            }
          }
        }`,
        variables: {
          checkoutId: checkoutData.id,
          customerAccessToken: token,
        },
      }
      try {
        token = await axios({
          url: 'https://lipslut2-0.myshopify.com/api/graphql',
          method: 'POST',
          headers: shopifyConfig,
          data: JSON.stringify(payload3),
        })
        let response = {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            data: checkoutData,
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
}
