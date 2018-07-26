const webpack = require('webpack')
module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-styled-components`,
    'gatsby-plugin-stripe-checkout',
    new webpack.DefinePlugin({
      LAMBDA_ENDPOINT: JSON.stringify(process.env.LAMBDA_ENDPOINT),
      STRIPE_PUBLISHABLE_KEY: JSON.stringify(
        process.env.STRIPE_PUBLISHABLE_KEY
      ),
    }),
  ],
}
