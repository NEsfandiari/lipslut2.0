import React from 'react'
import Spinner from 'react-spinkit'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ height }) => height || '0vh'};
`

const Loading = ({ height }) => (
  <Container height={height}>
    <Spinner name="double-bounce" name="ball-beat" color="#ff0086" />
  </Container>
)

export default Loading
