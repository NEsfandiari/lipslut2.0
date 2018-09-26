import Styled from 'styled-components'
import Link from 'gatsby-link'

const NavLink = Styled(Link)`
    color: black;
    font-size: ${({ fontSize }) => fontSize || '.64rem'};
    padding: .2rem
    letter-spacing: ${({ letterSpacing }) => letterSpacing || '.1rem'};
    transition: 0.2s ease;
    cursor: pointer;

    :visited {
      color: black;
    }
    :hover{
      color: ${({ hoverColor }) => hoverColor || 'darkgrey'};
    }
`
export default NavLink
