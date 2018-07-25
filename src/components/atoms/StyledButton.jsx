import React, { Component } from 'react'
import Styled from 'styled-components'

const StyledButton = Styled.button`
    margin: 1rem;
    font-size: ${({ fontSize }) => fontSize || '.8rem'};
    padding: 0;
    height: ${({ height }) => height || '3rem'};
    width: ${({ width }) => width || '7rem'};
    color: white;
    background-color: #FF0086;
    outline: none;

  :hover{
    background-color: #FF33A1;
  }
`

export default StyledButton
