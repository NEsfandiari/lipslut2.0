import Styled from 'styled-components'
import Link from 'gatsby-link'

const NavLink = Styled(Link)`
    color: black;
    font-size: .7rem;
    padding: .5rem
    letter-spacing: .1rem;
    transition: 0.2s ease;

    :visited {
      color: black;
    }
    :hover{
      color: darkgrey
    }
`
export default NavLink
