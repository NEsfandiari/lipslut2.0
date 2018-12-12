require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const fs = require('fs')
///ORDER SORTER FOR MAP DATA
//TODO: move this into separate file and import it

// ignored orders that were categorized under "pickup" or "Pick up" because no state was recorded
// if new order, just add to object below
// ie   '"""F*ck Trump"" Yellow Matte Liquid Lipstick -': 'F*ck Trump.'

const mapTitleToOrders = {
  '"""F*ck Trump"" Pink Matte Liquid Lipstick -"': 'F*ck Trump.',
  'F*ck Kavanaugh Matte Liquid Lipstick -': 'F*ck Kavanaugh',
  'F*ck Hollywood Matte Liquid Lipstick -': 'F*ck Hollywood.',
  '"BATCH—001: ""02"" -"': 'BATCH—001: "02"',
  '"BATCH—001: ""04"" -"': 'BATCH—001: "04"',
  '"BATCH—001: ""05"" -"': 'BATCH—001: "05"',
  'Lipslut Hat -': 'Lipslut Hat.',
  'Leftylibglobalistsantifacommiesocialisthollyweirdopigs -':
    'Leftylibglobalistsantifacommiesocialisthollyweirdopigs.',
}

let ordersData = {}

function CSVsorter() {
  fs.readFile('./src/__data__/.orders.csv', 'utf8', (err, data) => {
    if (err) {
      throw err
    }

    let orders = data.split('\n')
    for (let order of orders) {
      if (mapTitleToOrders[order.split(',')[0]]) {
        let product = mapTitleToOrders[order.split(',')[0]]
        let quantity = order.split(',')[1]
        let state = order.split(',')[2].slice(0, 2)

        quantity = +quantity

        if (ordersData[product]) {
          //append product to existing products
          if (ordersData[product][state]) {
            //append quantity to state
            ordersData[product][state] += quantity
          } else {
            // account for items that were picked up ('pi')
            if (state.toLowerCase() !== 'pi') {
              ordersData[product][state] = quantity
            }
          }
        } else {
          //add new entry
          ordersData[product] = { [state]: quantity }
        }
      }
    }

    let order = 'Line Item Name,Line Item Qty,Shipping State' + '\n'

    for (let product in ordersData) {
      for (let state in ordersData[product]) {
        order += product + ',' + ordersData[product][state] + ',' + state + '\n'
      }
    }
    fs.writeFile('./src/__data__/sorted.csv', order, function(err) {
      if (err) {
        throw err
      }
    })
  })
}

// sort CSV file before building Gatsby
exports.onPreBootstrap = () => CSVsorter()
// create product pages from contentful graphql data
const path = require('path')
exports.createPages = async ({ actions, graphql }) => {
  function orderSorter(data) {
    let ordersData = {}

    data.map(order => {
      let product = order.node.Line_Item_Name
      let quantity = order.node.Line_Item_Qty
      let state = order.node.Shipping_State

      quantity = +quantity

      if (ordersData[product]) {
        //append product to existing products
        if (ordersData[product][state]) {
          //append quantity to state
          ordersData[product][state] += quantity
        } else {
          ordersData[product][state] = quantity
        }
      } else {
        //add new entry
        ordersData[product] = { [state]: quantity }
      }
    })

    //We found that there are some entries in our sales data that contain a product
    //with an empty string for a name. This code removes those entries.
    delete ordersData['']
    return ordersData
  }
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    const ProductPageTemplate = path.resolve(`src/templates/ProductTemplate.js`)
    // Query for contentful nodes to use in creating pages.
    resolve(
      graphql(
        `
          {
            allSortedCsv {
              edges {
                node {
                  Line_Item_Name
                  Line_Item_Qty
                  Shipping_State
                }
              }
            }
            allShopifyProduct {
              edges {
                node {
                  title
                  availableForSale
                }
              }
            }
            allContentfulProductPage {
              edges {
                node {
                  title
                  charities {
                    charities
                  }
                  claims {
                    content {
                      nodeType
                      content {
                        value
                      }
                    }
                  }
                  ingredients {
                    content {
                      content {
                        value
                      }
                    }
                  }
                  price
                  sku
                  productCopy {
                    content {
                      nodeType
                      content {
                        value
                        nodeType
                        marks {
                          type
                        }
                      }
                    }
                  }
                  images {
                    file {
                      url
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
        const ordersFromCSV = orderSorter(result.data.allSortedCsv.edges)
        // Create pages for each graphql node.
        result.data.allContentfulProductPage.edges.forEach(({ node }) => {
          let path = node.title.replace(/\s+/g, '-') + '/'
          path = path.replace(/\./, '')
          path = path.replace(/\*/, '')
          let key = node.title.replace('.', '')
          let availableForSale
          result.data.allShopifyProduct.edges.forEach(function(product) {
            if (key === product.node.title.replace('.', '')) {
              availableForSale = product.node.availableForSale
            }
          })
          createPage({
            path,
            component: ProductPageTemplate,
            context: {
              node,
              mapData: ordersFromCSV[node.title],
              availableForSale,
            },
          })
        })
      })
    ).catch(err => console.log('i am an error: ', err))
  })
}

// =============================================================================
// CREATE graphql data from contentful- not necessary anymore because of pulgin
// =============================================================================
// const crypto = require('crypto')
// const contentful = require('contentful')

// exports.sourceNodes = async ({ actions }) => {
//   const { createNode } = actions
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
