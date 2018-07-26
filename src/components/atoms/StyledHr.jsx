import styled from 'styled-components'

const StyledHr = styled.hr`
  border: 0;
  margin: ${({ margin }) => margin || '2rem;'};
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0)
  );
  width: ${({ width }) => width || '100%'};
`
export default StyledHr
