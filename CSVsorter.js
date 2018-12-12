// deprecated into gatsby-node.js

const fs = require('fs')

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

    console.log('ordersData: ', ordersData)
    // TODO: parse our object into JSON object and write to JSON file in src/__data__/sorted
    // use JSON source plugin(?) vs building from scratch

    for (let product in ordersData) {
      for (let state in ordersData[product]) {
        let order =
          product + ', ' + ordersData[product][state] + ', ' + state + '\n'

        fs.appendFile('./src/__data__/raw/sorted.csv', order, function(err) {
          if (err) {
            throw err
          }
        })
      }
    }
  })
}

CSVsorter()
