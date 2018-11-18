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
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .questions {
    margin-top: 1rem;
  }
  hr {
    margin-left: 0;
  }
  @media (max-width: 420px) {
    padding: 1rem;
    h1 {
      text-align: center;
    }
  }
`

class Faq extends Component {
  componentDidMount() {
    this.props.resetSidebar()
  }
  render() {
    const faqs = this.props.faqs.map(faq => (
      <>
        <h3>{faq.question}</h3>
        <p>{faq.answer}</p>
        <StyledHr />
      </>
    ))
    return (
      <Container>
        <h1>Frequently Asked Questions</h1>
        <div className="questions">{faqs}</div>
        <p>
          If you still have questions, are interested in promoting, or just want
          to reach out, please check out our contact page.
        </p>
      </Container>
    )
  }
}

Faq.defaultProps = {
  faqs: [
    {
      question: 'What is Lipslut’s long-term vision?',
      answer:
        'We want Lipslut to be a movement that you are genuinely proud to stand behind. With your help, we believe Lipslut will become a household name for progressives and conservatives alike, albeit for different reasons. From there, we’ll use our platform to shake things up for the better.We plan to work with you through social media to offer a broad range of quality cosmetics, and to continue to help the causes you care about. Consider yourself a part of the team.',
    },
    {
      question: 'Why are we doing this?',
      answer:
        'Let’s just say we aren’t too pleased with our current sociopolitical landscape, and the standards of the cosmetics industry in general. Chances are you aren’t either. Rather than lip service, we’re putting our money where our mouth is.',
    },
    {
      question: 'How are our campaign charities chosen?',
      answer:
        ' With every lipstick purchased comes an opportunity to submit a vote for your favorite charity. At the end of our campaigns we’ll tally the results, and winners will be announced by popular vote. We’ll send out donations thereafter. Please understand that your choices may not be selected, and that all votes are treated equally.',
    },
    {
      question: 'Is Lipslut cruelty free?',
      answer: 'Duh. Who do you think we are?',
    },
    {
      question: 'What about the formula ingredients?',
      answer:
        'Isododecane, Dimethicone, Microcrystalline Wax, Trimethylsiloxysilicate, Polymethylsilsesquioxane, Methyl Methacrylate Crosspolymer, Phenoxyethanol/Ethylhexyglycerin, Propylene Carbonate, Vitamin E, Coconut Oil, Titanium Dioxide, Red 28 Lake (CI 45410), Yellow 5 Lake (CI 19140).',
    },
    {
      question: 'When will my order be shipped?',
      answer:
        ' Shipping time is largely dependent on the quantity of orders we receive, however, our small team is always pushing to send out orders ASAP. As always, we will be sure to keep you up-to-date through our social media if anything pops up. We appreciate your patience!',
    },
    {
      question: 'Return Policy',
      answer:
        'Due to the charitable nature of our fundraising campaign, at this time all sales are final.',
    },
  ],
}

export default Faq
