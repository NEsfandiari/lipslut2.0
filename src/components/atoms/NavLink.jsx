import Styled from 'styled-components'
import { Link } from 'gatsby'

const NavLink = Styled(Link)`
    color: ${({ color }) => color || 'black'};
    font-size: ${({ fontSize }) => fontSize || '.85rem'};
    padding: .2rem
    letter-spacing: ${({ letterSpacing }) => letterSpacing || '.1rem'};
    transition: 0.2s ease;
    cursor: pointer;

    :visited {
      color: ${({ color }) => color || 'black'};
    }
    :hover{
      color: ${({ hovercolor }) => hovercolor || 'darkgrey'};
    }
`
export default NavLink
