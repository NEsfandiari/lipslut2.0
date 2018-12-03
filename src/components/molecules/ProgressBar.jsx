import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  p {
    margin: 0.4375rem 0;
  }
  .bar-container {
    width: 100%;
    background: #fff;
  }
`

const Bar = styled.div.attrs(props => ({
  progress: props.progress || '0',
}))`
  width: ${props => props.progress};
  height: 0.875rem;
  background: #ff0086;
  transition: 1.5s;
  transition-timing-function: ease;
`
class ProgressBar extends Component {
  static defaultProps = {
    freeShippingGoal: 40,
  }

  render() {
    const { cart } = this.props
    const subtotal = cart
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price * currentValue.quantity
      }, 0)
      .toFixed(2)

    const percentageComplete =
      subtotal / this.props.freeShippingGoal > 1
        ? '100%'
        : `${(subtotal / this.props.freeShippingGoal) * 100}%`

    const goalShortfall = (this.props.freeShippingGoal - subtotal).toFixed(2)

    // Styles needed as bold font and regular font in current font family (i.e. futura) are visually indistinguishable
    const progressStyles = {
      fontFamily: 'helvetica',
      fontSize: '1.1em',
      fontWeight: '900',
    }

    const successMessage = 'Congrats! You get free standard shipping.'
    const progressMessage = (
      <span>
        You are <strong style={progressStyles}>${goalShortfall}</strong> away
        from free standard shipping
      </span>
    )

    const message =
      this.props.freeShippingGoal - subtotal < 0
        ? successMessage
        : progressMessage

    return (
      <Container>
        <p>{message}</p>
        <div className="bar-container">
          <Bar progress={percentageComplete} />
        </div>
      </Container>
    )
  }
}

export default ProgressBar
