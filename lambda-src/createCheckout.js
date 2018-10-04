require('dotenv').config({ path: '.env.development' })
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
    try {
      const checkoutData = await axios({
        url: 'https://lipslut2-0.myshopify.com/admin/checkouts.json',
        method: 'post',
        headers: shopifyConfig,
        body: JSON.stringify({
          checkout: {
            line_items: data.items,
          },
        }),
      })
      checkoutData = checkoutData.data
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
