import React from 'react'
import styled from 'styled-components'

import { Product } from '../components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1, h2, h3, h4, p{
    font-family: 'futura';
   }
  hr{
    border: 0;
    margin: 2rem;
    height: 1px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0));
    width: 65%;
  }
`
const FuckTrump = () => (
  <Container>
    <Product
      title="F*ck Trump."
      claims={[
        'Selected by popular vote, F*ck Trump matte liquid lipstick is a balanced, mid-tone nude pink.',
        '50% of all earnings from F*ck Trump go towards helping a civil rights organization targeted by the Trump administration. This organization is to be chosen by the people, as with every lipstick purchased comes an opportunity to vote.',
        '50% towards charity, 100% against tyranny.',
        '*FIGHT ZERO TOLERANCE: 100% of earnings through July 19 will be donated to support families that have been separated at the border.',
        '**BACK-ORDERED: Due to viral demand, shipping will begin on a rolling basis next month. Thanks for your support—you guys rock <3',
        'Finally, a lipstick as bold as you.',
        'Claims: Cruelty-free, Vegan.',
        'Size: 0.11 fl oz. / 3.25 ml',
      ]}
      images={[
        'https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/5a0f95b5e4966b5d5322de4d/5a0fb219e2c4833a1eee6b21/1511143438618/newslite_large.jpg?format=1500w',
        'https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/5a0f95b5e4966b5d5322de4d/5a0f95b5ec212df5256cbf96/1511143438616/website+middle+finger+web+copy.jpg?format=1500w',
        'https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/5a0f95b5e4966b5d5322de4d/5a0f95b508522939d92c27c6/1511143438612/website+lips+web+copy.jpg?format=1500w',
      ]}
    />
  </Container>
)

export default FuckTrump
