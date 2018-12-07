import React, { Component } from 'react'

import styled from 'styled-components'
import ModalLayout from '../../layouts/ModalLayout'
import ModalVote from '../atoms/ModalVote'
import ModalSoldOut from '../atoms/ModalSoldOut'

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
            onClick={
              this.props.charities || !this.props.availableForSale
                ? this.toggleModal
                : this.handleSubmit
            }
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
          //ModalLayout component is rendered with a portal
          //everything inside ModalLayout is rendered at the top level (index.js)
          <ModalLayout>
            {this.props.availableForSale ? (
              <ModalVote
                charities={this.props.charities}
                toggleModal={this.toggleModal}
                handleChangeModal={this.handleChangeModal}
                handleSubmit={this.handleSubmit}
              />
            ) : (
              <ModalSoldOut toggleModal={this.toggleModal} />
            )}
          </ModalLayout>
        )}
      </Container>
    )
  }
}

export default ProductDescription
