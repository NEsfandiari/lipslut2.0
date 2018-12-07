require('dotenv').config({ path: '.env.development' })
const axios = require('axios')
const statusCode = 200
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
}

//Shopify calls this function when inventory changes
//if inventory is 0, this fn triggers a site rebuild via Netlify webhook
exports.handler = async function(event, context, callback) {
  let quantity = JSON.parse(event.body).available
  if (quantity === 0) {
    try {
      let resp = await axios.post(
        'https://api.netlify.com/build_hooks/5c085e4a67610c582ef779f5'
      )
    } catch (err) {
      console.log(err[0])
    }
  }
}
