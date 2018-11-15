// Gatsby v 1.91 window object problem hack
const windowGlobal = typeof window !== 'undefined' && window

class Cart {
  static editItem(componentThis, name, value, i) {
    let newCart = componentThis.state.cart
    newCart[i][name] = value
    componentThis.setState({
      cart: newCart,
    })
    windowGlobal.localStorage.setItem('cart', JSON.stringify(newCart))
  }
  static removeItem(componentThis, i) {
    let newCart = componentThis.state.cart
    newCart.splice(i, 1)
    componentThis.setState({
      cart: newCart,
    })
    windowGlobal.localStorage.setItem('cart', JSON.stringify(newCart))
  }
  static addItem(componentThis, title, price, quantity, image, sku) {
    let newCart = componentThis.state.cart
    // test if sku is in cart
    let cartI = null
    componentThis.state.cart.forEach((item, i) => {
      item.sku === sku ? (cartI = i) : (cartI = null)
    })
    cartI !== null
      ? newCart[cartI].quantity++
      : newCart.push({ title, price, quantity, image, sku })

    componentThis.setState({
      cart: newCart,
      sidebar: true,
      displayFix: true,
    })
    windowGlobal.localStorage.setItem('cart', JSON.stringify(newCart))
  }
  static clearCart(componentThis) {
    componentThis.setState({ cart: [] })
    windowGlobal.localStorage.setItem('cart', [])
  }
}

export default Cart
