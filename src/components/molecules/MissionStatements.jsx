import React, { Component } from 'react'
import Styled from 'styled-components'
import lightBlueLayout from '../../layouts/lightBlue'

const Container = Styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    padding: 5rem;
    h2{
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

const MissionStatements = ({ text, image }) => (
  <Container>
    <h2>Changing the world one face at a time.</h2>
    <div className="statements">
      <div className="statement">
        <img
          src="https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/t/5a0e6e7871c10b10891ca92f/1486789972984/?format=500w"
          alt="Mission Image 1"
        />
        <p>
          We work with you to create cause-driven products that raise awareness
          and fight for the issues you care about.
        </p>
      </div>
      <div className="statement">
        <img
          src="https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/t/5a0e6e7871c10b10891ca931/1486790014504/?format=500w"
          alt="Mission Image 1"
        />
        <p>
          We pledge to always use our platform to help organizations and
          individuals creating progressive social change.
        </p>
      </div>
      <div className="statement">
        <img
          src="https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/t/5a0e6e7871c10b10891ca933/1486790093728/GlobeLogo2.png?format=500w"
          alt="Mission Image 3"
        />
        <p>
          Be part of the movement—join our community and help empower people for
          generations to come.
        </p>
      </div>
    </div>
  </Container>
)

export default lightBlueLayout(MissionStatements)
