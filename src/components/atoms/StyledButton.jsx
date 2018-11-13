import Styled from 'styled-components'

const StyledButton = Styled.button`
    margin: ${({ margin }) => margin || '1rem'};
    padding: 0;
    height: ${({ height }) => height || '3rem'};
    width: ${({ width }) => width || '7rem'};
    font-size: ${({ fontSize }) => fontSize || '1rem'};
    letter-spacing: .1rem;
    color: ${({ color }) => color || '#FF0086'};
    background-color: ${({ backgroundColor }) => backgroundColor || 'white'};
    border-color: ${({ borderColor }) => borderColor || '#FF0086'};
    outline: none;
    border-radius: ${({ borderRadius }) => borderRadius || '2px'};
    border-width: ${({ borderWidth }) => borderWidth || '2px'};
    transition: 0.3s ease;
    cursor: pointer;
    

  :hover{
    background-color: ${({ hoverColor }) => hoverColor || '#FF0086'};
    color: white;
  }
  @media (max-width: 420px) {
    width: 90%;
  }
`

export default StyledButton
