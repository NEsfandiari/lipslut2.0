module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  // proxy: {
  //   prefix: '/localhost:9000',
  //   url: 'http:/',
  // },
  plugins: [
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-styled-components`,
    'gatsby-plugin-stripe-checkout',
    `gatsby-plugin-netlify`,
  ],
}
