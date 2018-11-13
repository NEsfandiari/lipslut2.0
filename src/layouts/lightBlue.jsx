import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background-color: #e4f1f4;
  position: relative;
  width: 102vw;
  right: 10%;
  @media (max-width: 420px) {
    width: 110%;
    right: 5%;
  }
`

const userAuthLayout = WrappedComponent => props => (
  <Container>
    <WrappedComponent {...props} />
  </Container>
)

export default userAuthLayout
