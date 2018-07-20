import React, { Component } from 'react'
import styled from 'styled-components'

import { StyledHr } from '../components/atoms'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem;
  animation: fadein 1s;
  @keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }
    .questions{
        margin-top: 1rem;
    }
    hr{
        margin-left: 0;
    }
`

class Faq extends Component {
  render() {
    return (
      <Container>
        <h1>Frequently Asked Questions</h1>
        <div className="questions">
          <h3>What is Lipslut’s long-term vision?</h3>
          <p>
            We want Lipslut to be a movement that you are genuinely proud to
            stand behind. With your help, we believe Lipslut will become a
            household name for progressives and conservatives alike, albeit for
            different reasons. From there, we’ll use our platform to shake
            things up for the better.
          </p>
          <p>
            We plan to work with you through social media to offer a broad range
            of quality cosmetics, and to continue to help the causes you care
            about. Consider yourself a part of the team.
          </p>
          <h3>Why are we doing this?</h3>
          <p>
            Let’s just say we aren’t too pleased with our current sociopolitical
            landscape, and the standards of the cosmetics industry in general.
            Chances are you aren’t either. Rather than lip service, we’re
            putting our money where our mouth is.{' '}
          </p>
          <StyledHr />
          <h3>How are our campaign charities chosen?</h3>
          <p>
            With every lipstick purchased comes an opportunity to submit a vote
            for your favorite charity. At the end of our campaigns we’ll tally
            the results, and winners will be announced by popular vote. We’ll
            send out donations thereafter. Please understand that your choices
            may not be selected, and that all votes are treated equally.
          </p>
          <StyledHr />
          <h3>Is Lipslut cruelty free?</h3>
          <p>Duh. Who do you think we are?</p>
          <h3>What about the formula ingredients?</h3>
          <p>
            Isododecane, Dimethicone, Microcrystalline Wax,
            Trimethylsiloxysilicate, Polymethylsilsesquioxane, Methyl
            Methacrylate Crosspolymer, Phenoxyethanol/Ethylhexyglycerin,
            Propylene Carbonate, Vitamin E, Coconut Oil, Titanium Dioxide, Red
            28 Lake (CI 45410), Yellow 5 Lake (CI 19140).
          </p>
          <StyledHr />
          <h3>When will my order be shipped?</h3>
          <p>
            Shipping time is largely dependent on the quantity of orders we
            receive, however, our small team is always pushing to send out
            orders ASAP. As always, we will be sure to keep you up-to-date
            through our social media if anything pops up. We appreciate your
            patience!
          </p>
          <h3>Return Policy</h3>
          <p>
            Due to the charitable nature of our fundraising campaign, at this
            time all sales are final.
          </p>
          <StyledHr />
        </div>
        <p>
          If you still have questions, are interested in promoting, or just want
          to reach out, please check out our contact page.
        </p>
      </Container>
    )
  }
}

export default Faq
