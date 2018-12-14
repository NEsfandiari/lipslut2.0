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

    // const payload2 = {
    //   query: `mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
    //     customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
    //       userErrors {
    //         field
    //         message
    //       }
    //       customerAddress {
    //         id
    //       }
    //     }
    //   }
    //   `,
    //   variables: {
    //     customerAccessToken: token,
    //     address: {
    //       lastName: 'Doe',
    //       firstName: 'John',
    //       address1: '123 Test Street',
    //       province: 'QC',
    //       country: 'Canada',
    //       zip: 'H3K0X2',
    //       city: 'Montreal',
    //     },
    //   },
    // }

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
      console.log('\n\n\nGetting to update call\n\n\n')
      response = await axios({
        url: 'https://lipslut2-0.myshopify.com/api/graphql',
        method: 'POST',
        headers: shopifyConfig,
        data: JSON.stringify(payload2),
      })

      console.log('\n\n\nhey look at me RESPONSE: ', response, '\n\n\n')

      if (response.status !== 200) throw 'error in update'
      else console.log('\n\n\nSUCCESS!!!\n\n\n')
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
