import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background-color: #e4f1f4;
  width: 100vw;
`

const userAuthLayout = ({ children, data, props }) => (
  <Container>{children}</Container>
)

export default userAuthLayout
