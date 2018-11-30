import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 362.97px;
  border: 1px solid #ff0086;
`

const Message = styled.p`
  margin-top: 40px;
`

const Bar = styled.div.attrs(props => ({
  progress: props.progress || '0',
}))`
  width: ${props => props.progress};
  height: 16px;
  background: #ff0086;
`

class ProgressBar extends Component {
  static defaultProps = {
    goal: 40,
  }

  render() {
    const { cart } = this.props
    const subtotal = cart
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price * currentValue.quantity
      }, 0)
      .toFixed(2)
    const percentage =
      subtotal / this.props.goal > 1
        ? '100%'
        : `${(subtotal / this.props.goal) * 100}%`

    const message =
      this.props.goal - subtotal < 0
        ? 'Congrats! You get free standard shipping.'
        : `You are $${(this.props.goal - subtotal).toFixed(
            2
          )} away from free standard shipping`

    return (
      <React.Fragment>
        <Message>{message}</Message>
        <Container>
          <Bar progress={percentage} />
        </Container>
      </React.Fragment>
    )
  }
}

export default ProgressBar
