export default function orderSorter(data) {
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
