import React from 'react'
import styled from 'styled-components'

const StyledHr = styled.hr`
    border: 0;
    margin: 2rem;
    height: 1px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0));
    width: ${({ width }) => width || '65%'};
`
export default StyledHr
