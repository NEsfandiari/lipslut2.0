require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  siteMetadata: {
    title: 'Lipslut',
  },
  proxy: {
    prefix: '/localhost:9000',
    url: 'http:/',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-stripe-checkout`,
    `gatsby-plugin-stripe-elements`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
        accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
        host: `cdn.contentful.com`,
      },
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint:
          'https://netlify.us19.list-manage.com/subscribe/post?u=8872e95e9fea0632ec13c477c&amp;id=b73b5132a6',
      },
    },
    `gatsby-plugin-netlify`,
  ],
}
