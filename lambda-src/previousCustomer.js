require('dotenv').config({ path: '.env.development' })
const stripe = require('stripe')(process.env.GATSBY_STRIPE_SECRET_KEY)
const axios = require('axios')
const statusCode = 200
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
}

exports.handler = function(event, context, callback) {
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

    const shopifyConfig = {
      'Content-Type': 'application/graphql',
      'X-Shopify-Access-Token': process.env.GATSBY_SHOPIFY_SECRET_KEY,
    }
    //  TODO: use async await for readibility
    axios({
      url: 'https://lipslut2-0.myshopify.com/admin/api/graphql.json',
      method: 'post',
      headers: shopifyConfig,
      data: `
        mutation {
        draftOrderCreate(
          input: {
            customerId: "${data.previousCustomer}",
            lineItems: [{
              variantId: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xNTU2MTk2ODYxNTQ4Mw==",
              quantity: 1
            }],
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
      .then(order => {
        order = order.data.data.draftOrderCreate
        return axios({
          url: 'https://lipslut2-0.myshopify.com/admin/api/graphql.json',
          method: 'post',
          headers: shopifyConfig,
          data: `
          mutation {
            draftOrderComplete(id: "${order.draftOrder.id}"){
              userErrors {
                field
                message
              }
              draftOrder {
                id
                status
                customer {
                  id
                }
              }
            }
            draftOrderInvoiceSend(id: "${order.draftOrder.id}"){
              userErrors {
                field
                message
              }
            }
          }
        `,
        })
      })
      .then(order => {
        order = order.data.data.draftOrderComplete
        console.log(order)
        let status =
          order === null || order.draftOrder.status !== 'paid'
            ? 'failed'
            : order.draftOrder.status
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
      })
      .catch(err => {
        let response = {
          statusCode: 500,
          headers,
          body: JSON.stringify({
            error: err.message,
          }),
        }
        callback(null, response)
      })
  }
}
