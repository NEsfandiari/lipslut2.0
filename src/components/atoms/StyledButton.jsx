import Styled from 'styled-components'

const StyledButton = Styled.button`
    margin: ${({ margin }) => margin || '1rem'};
    font-size: ${({ fontSize }) => fontSize || '.8rem'};
    padding: 0;
    height: ${({ height }) => height || '3rem'};
    width: ${({ width }) => width || '7rem'};
    color: ${({ color }) => color || 'white'};
    background-color: ${({ backgroundColor }) => backgroundColor || '#FF0086'};
    border-color: ${({ borderColor }) => borderColor};
    outline: none;
    border-radius: ${({ borderRadius }) => borderRadius || '1px'};
    border-width: ${({ borderWidth }) => borderWidth || '0'};
    cursor: pointer;
    

  :hover{
    background-color: ${({ hoverColor }) => hoverColor || '#FF33A1'};
  }
`

export default StyledButton
