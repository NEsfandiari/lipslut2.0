import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background-color: #e4f1f4;
  width: 100vw;
  position: relative;
  @media (max-width: 420px) {
    width: 110%;
  }
`

// wrapper component for viewport width blue background
// (used for product details and banner at top)

const lightBlue = WrappedComponent => props => (
  <Container>
    <WrappedComponent {...props} clasName="children" />
  </Container>
)

export default lightBlue
