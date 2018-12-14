import axios from 'axios'
// Gatsby window object problem hack
const windowGlobal = typeof window !== 'undefined' && window
// ? `http://localhost:9000/${lambdaName}`
// : process.env.GATSBY_LAMBDA_ENDPOINT + lambdaName,
function postLambda(lambdaName, data) {
  try {
    console.log('\n\n\nhostname: ', windowGlobal.location.hostname, '\n\n\n')
    return axios.post(
      windowGlobal.location.hostname === 'localhost'
        ? `https://2aee27ab.ngrok.io/${lambdaName}`
        : `https://deploy-preview-15--elated-carson-131bb5.netlify.com/${lambdaName}`,
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
