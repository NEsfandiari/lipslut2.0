require('dotenv').config({ path: '.env.development' })
const stripe = require('stripe')(process.env.GATSBY_STRIPE_SECRET_KEY)
const axios = require('axios')
const statusCode = 200
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
}
const shopifyConfig = {
  'Content-Type': 'application/json',
  'X-Shopify-Access-Token': process.env.GATSBY_SHOPIFY_SECRET_KEY,
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
  if (event.body[0] == '{') {
    let data = JSON.parse(event.body)
    data = JSON.parse(data.body)
    data = JSON.parse(data.body)
    try {
      let orderId = await axios({
        url: 'https://lipslut2-0.myshopify.com/admin/api/graphql.json',
        method: 'post',
        headers: shopifyConfig,
        data: `
        mutation {
        draftOrderCreate(
          input: {
            customerId: "${data.previousCustomer}",
            lineItems: ${data.items},
            useCustomerDefaultAddress: true
          }
        )
        {
          userErrors {
            field
            message
          }
          draftOrder {
            id
          }
        }
      }
    `,
      })
      stripe.charges.create({
        amount: parseInt(data.amount),
        currency: 'usd',
        description: 'Test data',
        source: data.token.id,
      })

      orderId = orderId.data.data.draftOrderCreate.draftOrder.id
      let orderStatus = await axios({
        url: 'https://lipslut2-0.myshopify.com/admin/api/graphql.json',
        method: 'post',
        headers: shopifyConfig,
        data: `
          mutation {
            draftOrderComplete(id: "${orderId}"){
              userErrors {
                field
                message
              }
              draftOrder {
                status
                customer {
                  id
                }
              }
            }
          }
        `,
      })
      orderStatus = orderStatus.data.data.draftOrderComplete.draftOrder.status
      await axios({
        url: 'https://lipslut2-0.myshopify.com/admin/api/graphql.json',
        method: 'post',
        headers: shopifyConfig,
        data: `
        mutation {
          draftOrderInvoiceSend(id: "${orderId}"){
            userErrors {
              field
              message
            }
          }
        }
        `,
      })
      let status =
        orderStatus === null || orderStatus !== 'COMPLETED'
          ? 'failed'
          : orderStatus
      let response = {
        statusCode,
        headers,
        body: JSON.stringify({
          status,
          previousCustomer: data.previousCustomer,
          customerType: 'Old',
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
