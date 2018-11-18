import React from 'react'
import Spinner from 'react-spinkit'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ height }) => height || '0vh'};
`

const Loading = props => {
  return (
    <Container height={props.height}>
      <Spinner name="three-bounce" color="#ff0086" />
    </Container>
  )
}

export default Loading
