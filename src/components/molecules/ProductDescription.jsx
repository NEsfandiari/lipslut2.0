import React, { Component } from 'react'
import { FaTimes } from 'react-icons/fa'
import styled from 'styled-components'
import Modal from '../Modal'

import { StyledHr, StyledButton, QuantityAdjustButton } from '../atoms'

const Container = styled.div`
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  padding: 1rem;

  .purchase {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-around;
    @media (max-width: 420px) {
      flex-direction: column;
    }
  }
  .price {
    font-size: 0.9rem;
    text-align: center;
    padding: 0.5rem;
    margin: 0;
    color: #ff009a;
    height: 2.5rem;
    width: 5rem;
  }
  h1 {
    white-space: nowrap;
    overflow: visible;
    width: 23rem;
  }

  @media (max-width: 420px) {
    padding: 0rem;
    hr {
      margin-left: 0;
      margin-right: 0;
    }
  }
`
//inline style for modal background (used inline style so we did not need to add more styles to top level index.css)
//styled components do not apply due to use of portal
const outerModalStyle = {
  display: 'flex',
  alignItems: 'center',
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(29, 29, 29, 0.7)',
  zIndex: 100000,
}

const modalStyle = {
  padding: '2em',
  backgroundColor: 'white',
  width: '70%',
  height: 'fit-content',
  margin: '0 auto',
}

class ProductDescription extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1,
      price: this.props.price,
      status: 'ADD TO BAG',
      hideModal: true,
      charity: '',
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.handleAdjust = this.handleAdjust.bind(this)
    this.handlePrice = this.handlePrice.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeModal = this.handleChangeModal.bind(this)
  }
  toggleModal() {
    this.setState(st => ({ hideModal: !st.hideModal }))
  }
  handleAdjust = e => {
    let newQuantity
    if (e.target.className === 'add') {
      newQuantity = this.state.quantity + 1
      this.setState({ quantity: newQuantity })
      this.handlePrice(newQuantity)
    } else {
      if (this.state.quantity > 1) {
        newQuantity = this.state.quantity - 1
        this.setState({ quantity: newQuantity })
        this.handlePrice(newQuantity)
      }
    }
  }
  handlePrice = quantity => {
    const newPrice = quantity * this.props.price
    this.setState({
      price: newPrice.toFixed(2),
    })
  }
  handleChangeModal(e) {
    this.setState({ charity: e.target.value })
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.handleCart(
      'add',
      this.props.title,
      this.props.price,
      parseInt(this.state.quantity),
      this.props.images[0],
      this.props.sku,
      this.state.charity
    )
    this.setState({ status: 'ADDED!' })

    if (this.state.charity !== '') {
      this.setState(this.toggleModal())
    }
  }
  render() {
    let charities
    if (this.props.charities !== null) {
      charities = this.props.charities.charities.map(charity => (
        <option value={charity}>{charity}</option>
      ))
    }

    const productCopy = this.props.productCopy.map((statement, i) => {
      if (statement.content.length === 1)
        return <p key={i}>{statement.content[0].value}</p>
      else {
        // Turn Special marks into subsequent html modifiers
        let fullClause = []
        statement.content.forEach(clause => {
          if (clause.marks.length > 0) {
            if (clause.marks[0].type === 'bold')
              fullClause.push(<b>{clause.value}</b>)
          } else fullClause.push(clause.value)
        })
        return <p key={i}>{fullClause}</p>
      }
    })
    return (
      <Container>
        <h1>{this.props.title}</h1>
        {productCopy}
        <StyledHr width={'100%'} margin={'.8rem'} />
        <form className="purchase">
          <QuantityAdjustButton
            quantity={this.state.quantity}
            handleAdjust={this.handleAdjust}
            id={''}
            color={'#FF009A'}
            height={'2.5rem'}
          />
          <StyledButton
            type="button"
            onClick={charities ? this.toggleModal : this.handleSubmit}
            height={'2.5rem'}
            width={'18rem'}
            fontSize={'.65rem'}
          >
            <b>{this.state.status}</b>
          </StyledButton>
          <p className="price">${this.state.price}</p>
        </form>
        {this.state.hideModal ? (
          ''
        ) : (
          //Modal component is rendered with a portal
          //everything inside Modal is rendered at the top level (index.js)
          <Modal>
            <div style={outerModalStyle}>
              <div id="modalBox" style={modalStyle}>
                <div
                  style={{
                    display: 'flex',
                    flex: 'wrap',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <p style={{ fontWeight: 'normal', fontSize: '20px' }}>
                      Cast your vote:
                    </p>
                  </div>

                  <div>
                    <button
                      style={{
                        backgroundColor: 'none',
                        border: 'none',
                        outline: 0,
                      }}
                      onClick={this.toggleModal}
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>

                <div>
                  <p>Our donation will be sent to the most popular charity.</p>
                </div>
                <div>
                  <form action="" onSubmit={this.handleSubmit}>
                    <select
                      name="charities"
                      id="charitiesDropDown"
                      onChange={this.handleChangeModal}
                    >
                      <option value="" />
                      {charities}
                    </select>
                    <div>
                      <button
                        style={{
                          backgroundColor: '#FF0086',
                          border: 'none',
                          outline: 0,
                          marginTop: '2rem',
                          height: '74px',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '14px',
                          padding: '1.875rem',
                        }}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </Container>
    )
  }
}

export default ProductDescription
