import React, { Component } from 'react'
import styled from 'styled-components'

import { Product, ProductMedia } from '../components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
class FuckTrump extends Component {
  state = {}
  render() {
    return (
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
          price={19.95}
          addItem={this.props.addItem}
        />
        <ProductMedia
          sellingPoints={[
            {
              headline: 'Bold Matte Finish',
              description: 'Packed with intense pigment to make a statement.',
            },
            {
              headline: 'Moisturizing',
              description:
                'Made with coconut oil and vitamin E to leave lips moisturized and soft.',
            },
            {
              headline: 'Long-Wearing',
              description:
                'Comfortable formula stays put, ensuring your lips are soft and pigmented all day.',
            },
          ]}
          media={[
            {
              image:
                'https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/5a1147dc419202823565d9f4/5a115a1253450af6e5c94f36/1511143472214/huffpostnew.png?format=300w',
              link:
                'https://www.huffingtonpost.com/entry/lipstick-charlottesville-donation_us_5995b34ee4b0d0d2cc8501fe',
            },
            {
              image:
                'https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/5a1340850d929768b4e35054/5a1340858165f56f1acd4750/1511211201816/bustlenew.png?format=300w',
              link:
                'https://www.bustle.com/p/lipsluts-fck-trump-lipstick-is-donating-all-proceeds-to-charlottesville-attack-victims-77010',
            },
            {
              image:
                'https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/5a1147dc419202823565d9f4/5a115a1271c10ba553233497/1511143472208/cosmonew.png?format=300w',
              link:
                'https://www.cosmopolitan.com/style-beauty/beauty/a9203834/college-student-created-this-anti-trump-lipstick-to-raise-money-for-womens-charities/',
            },
            {
              image:
                'https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/5a1147dc419202823565d9f4/5a115a13e2c4833a1e17a86b/1511143472216/teenvoguenew.png?format=300w',
              link:
                'https://www.teenvogue.com/story/lipslut-lipstick-college-student-donald-trump',
            },
            {
              image:
                'https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/5a1147dc419202823565d9f4/5a115a128165f561f5333002/1511143472205/fox.png?format=300w',
              link:
                'http://www.foxnews.com/lifestyle/2017/08/21/this-anti-trump-lipstick-is-supporting-victims-charlottesville.html',
            },
            {
              image:
                'https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/5a1147dc419202823565d9f4/5a115a12f9619a64a2d5c23d/1511143472202/breitbart.png?format=300w',
              link:
                'https://www.breitbart.com/big-hollywood/2017/08/18/beauty-brand-raises-10k-for-charlottesville-victims-by-selling-fck-trump-lipstick/',
            },
            {
              image:
                'https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/5a1147dc419202823565d9f4/5a115a12652dea88b0301415/1511143472212/hwoodreporternew.png?format=300w',
              link:
                'https://www.hollywoodreporter.com/news/lipsluts-fck-trump-lipstick-raises-10k-charlottesville-victims-1030658',
            },
            {
              image:
                'https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/5a1147dc419202823565d9f4/5a115a1324a694409f9722c8/1511143472219/r29new.png?format=300w',
              link:
                'https://www.refinery29.com/2017/08/168324/anti-trump-lipstick-donate-charlottesville-victims',
            },
          ]}
        />
      </Container>
    )
  }
}

export default FuckTrump
