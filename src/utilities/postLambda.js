import axios from 'axios'
// Gatsby window object problem hack
const windowGlobal = typeof window !== 'undefined' && window

function postLambda(lambdaName, data) {
  try {
    return axios.post(
      windowGlobal.location.hostname === 'localhost'
        ? `http://localhost:9000/${lambdaName}`
        : process.env.GATSBY_LAMBDA_ENDPOINT + lambdaName,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )
  } catch (err) {
    return console.log(lambdaName + 'failed', err)
  }
}

export default postLambda
