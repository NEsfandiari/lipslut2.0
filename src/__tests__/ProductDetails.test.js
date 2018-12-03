import React from 'react'
import renderer from 'react-test-renderer'
import ProductDetails from '../components/atoms/ProductDetails'

describe('ProductDetails', () => {
  it('renders correctly', () => {
    const data = {
      claims: [
        { nodeType: 'heading-5', content: [{ value: 'What is it?' }] },
        {
          nodeType: 'paragraph',
          content: [
            { value: 'A long wearing liquid lipstick with a matte finish.' },
          ],
        },
        { nodeType: 'heading-5', content: [{ value: 'How to use:' }] },
        {
          nodeType: 'paragraph',
          content: [
            {
              value:
                'Smooth a thin layer onto lips user our angled applicator for a bold pop of all day color. ',
            },
          ],
        },
        { nodeType: 'heading-5', content: [{ value: 'Claims:' }] },
        {
          nodeType: 'paragraph',
          content: [{ value: 'Cruelty Free, Paraben Free, Vegan. ' }],
        },
        { nodeType: 'heading-5', content: [{ value: 'Key Ingredients: ' }] },
        {
          nodeType: 'heading-6',
          content: [{ value: 'Color-Lock Technology' }],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              value:
                'One-of-a-kind, lightweight and creamy formula locks pigment onto lips for a high payoff look that won’t crease, fade, or smudge all day. ',
            },
          ],
        },
        {
          nodeType: 'heading-6',
          content: [{ value: 'Coconut + Jojoba Oil' }],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              value:
                'Makes for a silky application that spreads smooth and even. Sticky goop can f*ck off!',
            },
          ],
        },
        { nodeType: 'heading-6', content: [{ value: 'Vitamin E' }] },
        {
          nodeType: 'paragraph',
          content: [
            {
              value:
                'Leaves lips extra moisturized and plush. Helps provide a velvety seamless finish without flakiness or streakiness. ',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [{ value: 'Full ingredient list' }, { value: ' ' }],
        },
        { nodeType: 'paragraph', content: [{ value: '' }] },
        { nodeType: 'paragraph', content: [{ value: '' }] },
      ],
      ingredients:
        'Isododecane, Dimethicone, Microcrystalline Wax, Bentonite, Methyl Methacrylate Crosspolymer, Polymethylsilsesquioxane, Propylene Carbonate, Phenoxyethanol, Buxus Chinensis Oil, Coconut Oil, Tridecyl trimellitate, Titanium Dioxide, Red 28 Lake(CI 45410), Yellow 5 Lake.',
    }

    const tree = renderer.create(<ProductDetails product={data} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
