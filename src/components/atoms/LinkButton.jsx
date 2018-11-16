import Styled from 'styled-components'
import { Link } from 'gatsby'

const LinkButton = Styled(Link)`
    color: #FF0086
    border-radius: 2px 2px 2px 2px;
    border: 2px solid #FF0086;
    text-decoration: none;
    height: ${({ height }) => height || '3rem'};
    width: ${({ width }) => width || '14rem'};
    text-align: center;
    font-size: ${({ fontSize }) => fontSize || '.7rem'};
    line-height: ${({ lineHeight }) => lineHeight || '2.7rem'};
    letter-spacing: .1rem;
    transition: 0.3s ease;
    outline: none;
    cursor: pointer;

    :hover{
    color: white;
    background-color: #FF0086
  }
`

export default LinkButton
