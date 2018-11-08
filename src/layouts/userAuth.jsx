import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background-color: #e4f1f4;
  width: 120%;
  position: relative;
  right: 10%;
`

const userAuthLayout = WrappedComponent => props => (
  <Container>
    <WrappedComponent {...props} />
  </Container>
)

export default userAuthLayout
