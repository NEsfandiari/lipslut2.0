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
    'gatsby-plugin-layout',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Lipslut`,
        short_name: `Lipslut`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_ID,
        head: false,
        anonymize: true,
        respectDNT: true,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
        accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
        host: `cdn.contentful.com`,
      },
    },
    {
      resolve: 'gatsby-source-shopify',
      options: {
        shopName: 'lipslut2-0',
        accessToken: '68c81bce2d7868af2bf51cb7fd99066a',
        verbose: true,
      },
    },
    `gatsby-plugin-netlify`,
  ],
}
