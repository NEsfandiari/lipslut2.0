// deprecated into gatsby-node.js

export default function orderSorter(data) {
  let ordersData = {}

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

  data.map(order => {
    console.log('nodes: ', order.node)
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
  console.log(ordersData)
  return ordersData
}
