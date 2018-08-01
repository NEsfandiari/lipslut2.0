require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

// create product pages from graphql data
const path = require('path')

exports.createPages = async ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const ProductPageTemplate = path.resolve(`src/templates/ProductTemplate.js`)
    // Query for contentful nodes to use in creating pages.
    resolve(
      graphql(
        `
                {
                    allContentfulProductPage {
                        edges {
                            node {
                                title
                                descriptors
                                price
                                images{
                                    file {
                                        url
                                    }
                                }
                                mediaLogos{
                                    file {
                                        url
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
        result.data.allContentfulProductPage.edges.forEach(({ node }) => {
          let path = node.title.replace(/\s+/g, '-') + '/'
          path = path.replace(/\./, '')
          path = path.replace(/\*/, '')
          createPage({
            path,
            component: ProductPageTemplate,
            context: {
              node,
            },
          })
        })
      })
    )
  })
}
// exports.modifyWebpackConfig = ({ config, stage }) => {
//   switch (stage) {
//     case 'build-html':
//       config.plugin('define', webpack.DefinePlugin, [
//         { 'global.GENTLY': false },
//       ])

//       break
//   }

//   return config
// }
// =============================================================================
// CREATE graphql data from contentful- not necessary anymore because of pulgin
// =============================================================================
// const crypto = require('crypto')
// const contentful = require('contentful')

// exports.sourceNodes = async ({ boundActionCreators }) => {
//   const { createNode } = boundActionCreators
//   const client = await contentful.createClient({
//     space: process.env.GATSBY_CONTENTFUL_SPACE_ID,
//     accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
//   })
//   let data = await client.getEntries({
//     content_type: 'productPage',
//   })
//   data = data.items

//   data.map((item, i) => {
//     const itemNode = {
//       id: `${i}`,
//       parent: `__SOURCE__`,
//       internal: { type: `ProductPage` },
//       children: [],
//       title: item.fields.title,
//       descriptors: item.fields.descriptors,
//       price: item.fields.price,
//       images: item.fields.images,
//       mediaLogos: item.fields.mediaLogos,
//       mediaStories: item.fields.mediaStories,
//       sellingPoints: item.fields.sellingPoints,
//     }
//     const contentDigest = crypto
//       .createHash(`md5`)
//       .update(JSON.stringify(itemNode))
//       .digest(`hex`)
//     itemNode.internal.contentDigest = contentDigest
//     createNode(itemNode)
//   })
//   return
// }
