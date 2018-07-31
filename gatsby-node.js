require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

// create graphql data
const axios = require('axios')
const crypto = require('crypto')
const contentful = require('contentful')

exports.sourceNodes = async ({ boundActionCreators }) => {
  const { createNode } = boundActionCreators
  const client = await contentful.createClient({
    space: process.env.GATSBY_CONTENTFUL_SPACE_ID,
    environment: 'master', // defaults to 'master' if not set
    accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
  })
  let data = await client.getEntries({
    content_type: 'productPage',
  })
  data = data.items

  data.map((item, i) => {
    const itemNode = {
      id: `${i}`,
      parent: `__SOURCE__`,
      internal: { type: `ProductPage` },
      children: [],
      title: item.fields.title,
      descriptors: item.fields.descriptors,
      price: item.fields.price,
      images: item.fields.images,
      mediaLogos: item.fields.mediaLogos,
      mediaStories: item.fields.mediaStories,
      sellingPoints: item.fields.sellingPoints,
    }
    const contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(itemNode))
      .digest(`hex`)
    itemNode.internal.contentDigest = contentDigest
    createNode(itemNode)
  })
  return
}

// create product pages from graphql data
const path = require('path')

exports.createPages = async ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const ProductPageTemplate = path.resolve(`src/templates/ProductTemplate.js`)
    // Query for markdown nodes to use in creating pages.
    resolve(
      graphql(
        `
        {
            allProductPage {
              edges {
                node {
                  title
                  descriptors
                  price
                  images{
                    fields {
                      file {
                        url
                      }
                    }
                  }
                  mediaLogos{
                    fields{
                      file{
                        url
                      }
                    }
                  }
                  mediaStories
                  sellingPoints{
                    data {
                      headline
                      description
                    }
                  }
                }
              }
            }
          }
          
          `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        // Create pages for each graphql node.
        result.data.allProductPage.edges.forEach(({ node }) => {
          const path = node.title.replace(/\s+/g, '-')
          createPage({
            path,
            component: ProductPageTemplate,
            // In your blog post template's graphql query, you can use path
            // as a GraphQL variable to query for data from the markdown file.
            context: {
              node,
            },
          })
        })
      })
    )
  })
}
