require('dotenv').config({ path: '.env.development' })
const axios = require('axios')
const statusCode = 200
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
}

// 1. what type, 2. validate reuqest 3. handle request
// convert handler to switch statement that calls seperate function

exports.handler = function(event, context, callback) {
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

    if (!data.token || !data.idempotency_key) {
      console.error('Required information is missing.')
      callback(null, {
        sstatusCode,
        headers,
        body: JSON.stringify({ status: 'missing-information' }),
      })
    }

    // Handler Logic
    if (data.previousCustomer) {
      axios
        .post(
          process.env.GATSBY_NODE_ENV === 'development'
            ? 'http://localhost:9000/previousCustomer'
            : `${process.env.GATSBY_LAMBDA_ENDPOINT}previousCustomer`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            body: event.body,
          }
        )
        .then(res => {
          let response = {
            statusCode,
            headers,
            body: JSON.stringify(res.data),
          }
          callback(null, response)
        })
    } else {
      axios
        .post(
          process.env.GATSBY_NODE_ENV === 'development'
            ? 'http://localhost:9000/newCustomer'
            : `${process.env.GATSBY_LAMBDA_ENDPOINT}newCustomer`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            body: event.body,
          }
        )
        .then(res => {
          let response = {
            statusCode,
            headers,
            body: JSON.stringify(res.data),
          }
          callback(null, response)
        })
    }
  }
}
