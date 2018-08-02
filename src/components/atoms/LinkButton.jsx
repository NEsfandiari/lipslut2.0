import Styled from 'styled-components'
import Link from 'gatsby-link'

const LinkButton = Styled(Link)`
    color: #FF0086
    border-radius: 2px 2px 2px 2px;
    border: 2px solid #FF0086;
    text-decoration: none;
    height: ${({ height }) => height || '4rem'};
    width: ${({ width }) => width || '10rem'};
    text-align: center;
    font-size: ${({ fontSize }) => fontSize || '.7rem'};
    line-height: ${({ lineHeight }) => lineHeight || '3.5rem'};
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
