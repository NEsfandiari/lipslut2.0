import axios from 'axios'
function postLambda(lambdaName, data) {
  axios.post(
    location.hostname === 'localhost'
      ? `http://localhost:9000/${lambdaName}`
      : process.env.GATSBY_LAMBDA_ENDPOINT + lambdaName,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )
}

export default postLambda
