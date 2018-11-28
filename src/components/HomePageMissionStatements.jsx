import React from 'react'
import Styled from 'styled-components'
import lightBlueLayout from '../layouts/lightBlue'

const Container = Styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    padding: 5rem 7rem;
    h2{
        margin-bottom: 4rem;
        font-size: 2rem;
        text-align:center;
    }
    .statements{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .statement{
        flex-basis: 33%;
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
            height: 5rem;
        }
        p{
            font-size: .9rem;
            width:80%;
        }
    }
    @media (max-width: 420px) {
      .statements{
        flex-direction: column;
      }
      padding:1rem;
      flex-direction: column;
    }
    
 
`

const MissionStatements = props => {
  let statements = props.missionIcons.map((icon, idx) => (
    <MissionStatement text={props.statementsCopy[idx]} image={icon} />
  ))
  return (
    <Container>
      <h2>{props.missionHeader}</h2>
      <div className="statements">{statements}</div>
    </Container>
  )
}

const MissionStatement = ({ text, image }) => (
  <div className="statement">
    <img src={image} alt="Mission Icon" />
    <p>{text}</p>
  </div>
)

export default lightBlueLayout(MissionStatements)
