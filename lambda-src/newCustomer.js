require('dotenv').config({ path: '.env.development' })
const stripe = require('stripe')(process.env.GATSBY_STRIPE_SECRET_KEY)
const axios = require('axios')
const statusCode = 200
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
}
const shopifyConfig = {
  'Content-Type': 'application/graphql',
  'X-Shopify-Access-Token': process.env.GATSBY_SHOPIFY_SECRET_KEY,
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

    try {
      let customerId = await axios({
        url: 'https://lipslut2-0.myshopify.com/admin/api/graphql.json',
        method: 'POST',
        headers: shopifyConfig,
        data: `
        mutation {
          customerCreate(
            input: {
              acceptsMarketing: true, 
              addresses: {
                address1: "${data.token.card.address_line1}",
                city: "${data.token.card.address_city}",
                country: "${data.token.card.country}",
                zip: "${data.token.card.address_zip}",
              }, 
              email: "${data.token.email}", 
              firstName: "${data.firstName}", 
              lastName: "${data.lastName}", 
              phone:"${data.phoneNumber}"
            }
          )
          {
            userErrors {
              field
              message
            }
            customer {
              id
              firstName
              lastName
            }
          }
        }
      `,
      })
      customerId = customerId.data.data.customerCreate.customer.id
      let orderId = await axios({
        url: 'https://lipslut2-0.myshopify.com/admin/api/graphql.json',
        method: 'POST',
        headers: shopifyConfig,
        data: `
            mutation {
            draftOrderCreate(
              input: {
                customerId: "${customerId}",
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
        method: 'POST',
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
        method: 'POST',
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
        order === null || order.status !== 'paid' ? 'failed' : order.status
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
