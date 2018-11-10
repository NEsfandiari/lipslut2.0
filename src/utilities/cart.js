class Cart {
  editItem(componentThis, name, value, i) {
    let newCart = this.state.cart
    newCart[i][name] = value
    this.setState({
      cart: newCart,
    })
    windowGlobal.localStorage.setItem('cart', JSON.stringify(newCart))
  }
  removeItem(componentThis, i) {
    let newCart = this.state.cart
    newCart.splice(i, 1)
    this.setState({
      cart: newCart,
    })
    windowGlobal.localStorage.setItem('cart', JSON.stringify(newCart))
  }
  addItem(componentThis, title, price, quantity, image, sku) {
    let newCart = this.state.cart
    // test if sku is in cart
    let cartI = null
    this.state.cart.forEach((item, i) => {
      item.sku == sku ? (cartI = i) : (cartI = null)
    })
    cartI !== null
      ? newCart[cartI].quantity++
      : newCart.push({ title, price, quantity, image, sku })

    this.setState({
      cart: newCart,
      sidebar: true,
      displayFix: true,
    })
    windowGlobal.localStorage.setItem('cart', JSON.stringify(newCart))
  }
  clearCart(componentThis) {
    this.setState({ cart: [] })
    windowGlobal.localStorage.setItem('cart', [])
  }
}
