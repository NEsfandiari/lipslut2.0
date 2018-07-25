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
          title="F*ck Hollywood."
          claims={[
            'Ready for the red carpet, F*ck Hollywood matte liquid lipstick is an outspoken true red.',
            'In response to recent scandals, 50% of all earnings from F*ck Hollywood go towards helping anti-sexual assault organizations. These organizations are to be chosen by the people, as with every lipstick purchased comes an opportunity to vote.',
            '50% towards charity, 100% against tyranny.',
            'Claims: Cruelty-free, Vegan.',
            'Size: 0.11 fl oz. / 3.25 ml',
          ]}
          images={[
            'https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/5a12380e53450af6e5e65072/5a1239c04192028235842900/1511145212468/2+tubes+red.jpg?format=750w',
            'https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/5a12380e53450af6e5e65072/5a1239c0c83025116156e498/1511145212471/hollywood+website+middle+finger.jpg?format=750w',
            'https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/5a12380e53450af6e5e65072/5a1239c0c83025116156e49f/1511145212473/lip+home+page2.jpg?format=750w',
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
                'https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/5a1340850d929768b4e35054/5a1340858165f56f1acd4750/1511211201816/bustlenew.png?format=300w',
              link:
                'https://www.bustle.com/p/lipsluts-fck-hollywood-lipstick-is-the-latest-way-for-beauty-lovers-to-support-sexual-assault-survivors-5517071',
            },
            {
              image:
                'https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/5a1340850d929768b4e35054/5a4de997e2c4835f86a483b8/1515055651716/hwoodreporternew+copy.png?format=300w',
              link:
                'https://www.hollywoodreporter.com/news/cosmetics-company-is-selling-fck-hollywood-lipsticks-reaction-sexual-misconduct-allegations-1061018',
            },
            {
              image:
                'https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/5a1340850d929768b4e35054/5a4de998e2c4835f86a483bb/1515055673920/r29new+copy.png?format=300w',
              link:
                'https://www.refinery29.com/2017/11/181907/anti-hollywood-lipstick-donate-sexual-assault',
            },
            {
              image:
                'https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/5a1340850d929768b4e35054/5a4dec5f9140b72118622973/1515056264723/mic2.png?format=300w',
              link:
                'https://mic.com/articles/186309/from-the-folks-behind-this-years-fck-trump-lipgloss-comes-their-latest-fck-hollywood#.i2kkFN6Cu',
            },
            {
              image:
                'https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/5a1340850d929768b4e35054/5a4dec64c8302529ed830470/1515056290946/elle2.png?format=300w',
              link:
                'https://www.elle.com/uk/beauty/make-up/news/a40210/lipslut-fuck-hollywood-lipstick/',
            },
            {
              image:
                'https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/5a1340850d929768b4e35054/5a4dec69e2c4835f86a4b513/1515056321552/stylecaster2.png?format=300w',
              link: 'http://stylecaster.com/beauty/lipslut-hollywood-lipstick/',
            },
          ]}
        />
      </Container>
    )
  }
}

export default FuckTrump
