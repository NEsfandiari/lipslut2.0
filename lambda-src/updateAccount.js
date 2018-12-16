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
  console.log('is this even happening right now what the eff?')
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

    // update customer data
    // TODO fix connection to shopify; shopify not updating
    const payload2 = {
      query: `mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
        customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
          userErrors {
            field
            message
          }
          customer {
            id
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
        customerAccessToken: token,
        customer: {
          firstName: 'It',
          lastName: 'Worked',
          email: 'abc@gmail.com',
          phone: '1234567890',
        },
      },
    }

    let response
    try {
      response = await axios({
        url: 'https://lipslut2-0.myshopify.com/api/graphql',
        method: 'UPDATE',
        headers: shopifyConfig,
        data: JSON.stringify(payload2),
      })
      if (response.status !== 200) throw 'error in update'
      else console.log('\n\n\n SUCCESS!!!\n\n\n')
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
  }
}
