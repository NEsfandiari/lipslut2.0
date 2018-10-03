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

    axios({
      url: 'https://lipslut2-0.myshopify.com/admin/api/graphql.json',
      method: 'post',
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
      .then(customer => {
        customer = customer.data.data
        console.log(customer.data.data.customer)
        return axios({
          url: 'https://lipslut2-0.myshopify.com/admin/api/graphql.json',
          method: 'post',
          headers: shopifyConfig,
          data: `
            mutation {
            draftOrderCreate(
              input: {
                customerId: "${customer.data}",
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
