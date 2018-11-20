import React from 'react'
import Styled from 'styled-components'
import lightBlueLayout from '../layouts/lightBlue'

const Container = Styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    padding: 5rem;
    h2{
        font-size: 2rem;
        text-align:center;
        font-family: GlacialIndifferenceRegular;
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
            height: 12rem;
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
  let statements = props.statements.map(statement => (
    <MissionStatement text={statement.text} image={statement.image} />
  ))
  return (
    <Container>
      <h2>Changing the world one face at a time.</h2>
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

MissionStatements.defaultProps = {
  statements: [
    {
      text:
        'We work with you to create cause-driven products that raise awareness and fight for the issues you care about.',
      image:
        'https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/t/5a0e6e7871c10b10891ca92f/1486789972984/?format=500w',
    },
    {
      text:
        'We pledge to always use our platform to help organizations and individuals creating progressive social change.',
      image:
        'https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/t/5a0e6e7871c10b10891ca931/1486790014504/?format=500w',
    },
    {
      text:
        'Be part of the movement—join our community and help empower people for generations to come.',
      image:
        'https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/t/5a0e6e7871c10b10891ca933/1486790093728/GlobeLogo2.png?format=500w',
    },
  ],
}

export default lightBlueLayout(MissionStatements)
