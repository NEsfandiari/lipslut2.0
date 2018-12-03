import React from 'react'
import renderer from 'react-test-renderer'
import ProductsStage from '../components/molecules/ProductsStage'

describe('ProductsStage', () => {
  it('renders correctly', () => {
    const data = {
      data: {
        allContentfulProductPage: {
          edges: [
            {
              node: {
                title: 'BATCH—001: "04"',
                claims: {
                  content: [
                    {
                      nodeType: 'heading-5',
                      content: [
                        {
                          value: 'What is it?',
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value:
                            'A long wearing liquid lipstick with a matte finish.',
                        },
                      ],
                    },
                    {
                      nodeType: 'heading-5',
                      content: [
                        {
                          value: 'How to use:',
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value:
                            'Smooth a thin layer onto lips user our angled applicator for a bold pop of all day color. ',
                        },
                      ],
                    },
                    {
                      nodeType: 'heading-5',
                      content: [
                        {
                          value: 'Claims:',
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: 'Cruelty Free, Paraben Free, Vegan. ',
                        },
                      ],
                    },
                    {
                      nodeType: 'heading-5',
                      content: [
                        {
                          value: 'Key Ingredients: ',
                        },
                      ],
                    },
                    {
                      nodeType: 'heading-6',
                      content: [
                        {
                          value: 'Color-Lock Technology',
                        },
                      ],
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
                      content: [
                        {
                          value: 'Coconut + Jojoba Oil',
                        },
                      ],
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
                    {
                      nodeType: 'heading-6',
                      content: [
                        {
                          value: 'Vitamin E',
                        },
                      ],
                    },
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
                      content: [
                        {
                          value: 'Full ingredient list',
                        },
                        {
                          value: ' ',
                        },
                      ],
                    },
                  ],
                },
                ingredients: {
                  content: [
                    {
                      content: [
                        {
                          value:
                            'Isododecane, Dimethicone, Microcrystalline Wax, Bentonite, Methyl Methacrylate Crosspolymer, Polymethylsilsesquioxane, Propylene Carbonate, Phenoxyethanol, Buxus Chinensis Oil, Coconut Oil, Tridecyl trimellitate, Titanium Dioxide, Red 28 Lake(CI 45410), Yellow 5 Lake. ',
                        },
                      ],
                    },
                  ],
                },
                price: 19.95,
                sku:
                  'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xNTYxNDUyNjAyOTg4Mw==',
                productCopy: {
                  content: [
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value:
                            'Introducing BATCH—001, our first ever run from Lipslut Lab!',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value:
                            "\"04\" matte liquid lipstick is a mid-tone peachy coral, and is a fun shade for everyday wear. \n \nWe've been working hard behind the scenes to create a full line of Lipslut product! For those of you who just can't wait, here's a chance to get your hands on new shades early. We want you to be a part of our development process! \n  \n",
                          nodeType: 'text',
                          marks: [],
                        },
                        {
                          value: '*Limited run of 500 pieces.',
                          nodeType: 'text',
                          marks: [
                            {
                              type: 'bold',
                            },
                          ],
                        },
                        {
                          value: ' Pre-order it while you can.',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: '**Shipping: ',
                          nodeType: 'text',
                          marks: [
                            {
                              type: 'bold',
                            },
                          ],
                        },
                        {
                          value: 'to begin in 6-8 weeks as of October 1st.',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: 'Claims: Cruelty-free, Vegan. ',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: 'Size: 0.11 fl oz. / 3.25 ml',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                  ],
                },
                images: [
                  {
                    file: {
                      url:
                        '//images.ctfassets.net/ubhny9w4s07i/68syG8E0X6IWUI2GwUgm6w/dccce1e600ac41e5a78e2c7134d26511/00104_tube.png',
                    },
                  },
                  {
                    file: {
                      url:
                        '//images.ctfassets.net/ubhny9w4s07i/5NuGMi6eeQOMu6YE2SMQOu/ca405ca5bab195cac799745d2992664d/lips_004_new.png',
                    },
                  },
                  {
                    file: {
                      url:
                        '//images.ctfassets.net/ubhny9w4s07i/6H82MfWlhe2qWmW6UyceIu/bef1d9635a042b933ae3a4452d5f6a28/middle_finger_00104.png',
                    },
                  },
                ],
              },
            },
            {
              node: {
                title:
                  'Leftylibglobalistsantifacommiesocialisthollyweirdopigs.',
                claims: {
                  content: [
                    {
                      nodeType: 'heading-5',
                      content: [
                        {
                          value: 'What is it?',
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value:
                            'A long wearing liquid lipstick with a matte finish.',
                        },
                      ],
                    },
                    {
                      nodeType: 'heading-5',
                      content: [
                        {
                          value: 'How to use:',
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value:
                            'Smooth a thin layer onto lips user our angled applicator for a bold pop of all day color. ',
                        },
                      ],
                    },
                    {
                      nodeType: 'heading-5',
                      content: [
                        {
                          value: 'Claims:',
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: 'Cruelty Free, Paraben Free, Vegan. ',
                        },
                      ],
                    },
                    {
                      nodeType: 'heading-5',
                      content: [
                        {
                          value: 'Key Ingredients: ',
                        },
                      ],
                    },
                    {
                      nodeType: 'heading-6',
                      content: [
                        {
                          value: 'Color-Lock Technology',
                        },
                      ],
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
                      content: [
                        {
                          value: 'Coconut + Jojoba Oil',
                        },
                      ],
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
                    {
                      nodeType: 'heading-6',
                      content: [
                        {
                          value: 'Vitamin E',
                        },
                      ],
                    },
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
                      content: [
                        {
                          value: 'Full ingredient list',
                        },
                        {
                          value: ' ',
                        },
                      ],
                    },
                  ],
                },
                ingredients: {
                  content: [
                    {
                      content: [
                        {
                          value:
                            'Isododecane, Dimethicone, Microcrystalline Wax, Bentonite, Methyl Methacrylate Crosspolymer, Polymethylsilsesquioxane, Propylene Carbonate, Phenoxyethanol, Buxus Chinensis Oil, Coconut Oil, Tridecyl trimellitate, Titanium Dioxide, D&C Red No.6 (CI 15850), Iron Oxides.',
                        },
                      ],
                    },
                  ],
                },
                price: 19.95,
                sku:
                  'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xNTYxNDYyNzYxMDY4Mw==',
                productCopy: {
                  content: [
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value:
                            'Supercalifragilisticexpialidocious step aside—it’s 2018 and things have gotten weird. Leftylib-yada yada matte liquid lipstick is a deepcoolberrypurplishbluetoneplumredwine because apparently real words are limiting now.',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value:
                            "You asked for it weirdos, so here it is. To be honest, we can’t believe we're making it either. ",
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: '#ThanksKim',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: '*Limited run of 500 pieces.',
                          nodeType: 'text',
                          marks: [
                            {
                              type: 'bold',
                            },
                          ],
                        },
                        {
                          value: ' Pre-order it while you can.',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: 'Claims: Cruelty-free, Vegan. ',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: 'Size: 0.11 fl oz. / 3.25 ml',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                  ],
                },
                images: [
                  {
                    file: {
                      url:
                        '//images.ctfassets.net/ubhny9w4s07i/4sP57InDzagwUgmUyYucsU/288ee2ffad4490cfdadb4047d85e4b2e/glob_product2.png',
                    },
                  },
                  {
                    file: {
                      url:
                        '//images.ctfassets.net/ubhny9w4s07i/4amq04S51eCAWa88qgYouw/fbb1ed12ad39633b44071e616e9bf86e/1500_globcutout.png',
                    },
                  },
                  {
                    file: {
                      url:
                        '//images.ctfassets.net/ubhny9w4s07i/3Mx1x9JjTaCWI4Iey6EEKm/05a856c3d1d1e7be11df33f4fa5ca938/IMG_0745_copy.PNG',
                    },
                  },
                ],
              },
            },
            {
              node: {
                title: 'BATCH—001: "05"',
                claims: {
                  content: [
                    {
                      nodeType: 'heading-5',
                      content: [
                        {
                          value: 'What is it?',
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value:
                            'A long wearing liquid lipstick with a matte finish.',
                        },
                      ],
                    },
                    {
                      nodeType: 'heading-5',
                      content: [
                        {
                          value: 'How to use:',
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value:
                            'Smooth a thin layer onto lips user our angled applicator for a bold pop of all day color. ',
                        },
                      ],
                    },
                    {
                      nodeType: 'heading-5',
                      content: [
                        {
                          value: 'Claims:',
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: 'Cruelty Free, Paraben Free, Vegan. ',
                        },
                      ],
                    },
                    {
                      nodeType: 'heading-5',
                      content: [
                        {
                          value: 'Key Ingredients: ',
                        },
                      ],
                    },
                    {
                      nodeType: 'heading-6',
                      content: [
                        {
                          value: 'Color-Lock Technology',
                        },
                      ],
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
                      content: [
                        {
                          value: 'Coconut + Jojoba Oil',
                        },
                      ],
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
                    {
                      nodeType: 'heading-6',
                      content: [
                        {
                          value: 'Vitamin E',
                        },
                      ],
                    },
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
                      content: [
                        {
                          value: 'Full ingredient list',
                        },
                        {
                          value: ' ',
                        },
                      ],
                    },
                  ],
                },
                ingredients: {
                  content: [
                    {
                      content: [
                        {
                          value:
                            'Isododecane, Dimethicone, Microcrystalline Wax, Bentonite, Methyl Methacrylate Crosspolymer, Polymethylsilsesquioxane, Propylene Carbonate, Phenoxyethanol, Buxus Chinensis Oil, Coconut Oil, Tridecyl trimellitate, Titanium Dioxide, Red 28 Lake(CI 45410), Yellow 5 Lake, Iron Oxides. ',
                        },
                      ],
                    },
                  ],
                },
                price: 19.95,
                sku:
                  'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xNTYxNDU2NzkwNzM4Nw==',
                productCopy: {
                  content: [
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value:
                            'Introducing BATCH—001, our first ever run from Lipslut Lab!',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value:
                            "\"05\" matte liquid lipstick is a dusty brown nude, and is a quirky alternative to basic neutrals. \n \nWe've been working hard behind the scenes to create a full line of Lipslut product! For those of you who just can't wait, here's a chance to get your hands on new shades early. We want you to be a part of our development process! \n  \n",
                          nodeType: 'text',
                          marks: [],
                        },
                        {
                          value: '*Limited run of 500 pieces.',
                          nodeType: 'text',
                          marks: [
                            {
                              type: 'bold',
                            },
                          ],
                        },
                        {
                          value: ' Pre-order it while you can.',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: '**Shipping:',
                          nodeType: 'text',
                          marks: [
                            {
                              type: 'bold',
                            },
                          ],
                        },
                        {
                          value: ' to begin in 6-8 weeks as of October 1st.',
                          nodeType: 'text',
                          marks: [],
                        },
                        {
                          value: ' ',
                          nodeType: 'text',
                          marks: [
                            {
                              type: 'bold',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: 'Claims: Cruelty-free, Vegan. ',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: 'Size: 0.11 fl oz. / 3.25 ml',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                  ],
                },
                images: [
                  {
                    file: {
                      url:
                        '//images.ctfassets.net/ubhny9w4s07i/6fZU1HI8RqcK42kQQQ04kI/c7c654ecd45df1a09c2f818c576ff611/00105_tube.png',
                    },
                  },
                  {
                    file: {
                      url:
                        '//images.ctfassets.net/ubhny9w4s07i/UPmXqftWkUGcKMwU2UgUa/750ba6cdae5a482f2cd1eea89391247a/00105_lips.png',
                    },
                  },
                  {
                    file: {
                      url:
                        '//images.ctfassets.net/ubhny9w4s07i/7KAQTzT8JiG6WYWIWw0UWg/c8dbcc8f5a17293f8fb29174847e3633/00105_middle_finger.png',
                    },
                  },
                ],
              },
            },
            {
              node: {
                title: 'BATCH—001: "02"',
                claims: {
                  content: [
                    {
                      nodeType: 'heading-5',
                      content: [
                        {
                          value: 'What is it?',
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value:
                            'A long wearing liquid lipstick with a matte finish.',
                        },
                      ],
                    },
                    {
                      nodeType: 'heading-5',
                      content: [
                        {
                          value: 'How to use:',
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value:
                            'Smooth a thin layer onto lips user our angled applicator for a bold pop of all day color. ',
                        },
                      ],
                    },
                    {
                      nodeType: 'heading-5',
                      content: [
                        {
                          value: 'Claims:',
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: 'Cruelty Free, Paraben Free, Vegan. ',
                        },
                      ],
                    },
                    {
                      nodeType: 'heading-5',
                      content: [
                        {
                          value: 'Key Ingredients: ',
                        },
                      ],
                    },
                    {
                      nodeType: 'heading-6',
                      content: [
                        {
                          value: 'Color-Lock Technology',
                        },
                      ],
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
                      content: [
                        {
                          value: 'Coconut + Jojoba Oil',
                        },
                      ],
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
                    {
                      nodeType: 'heading-6',
                      content: [
                        {
                          value: 'Vitamin E',
                        },
                      ],
                    },
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
                      content: [
                        {
                          value: 'Full ingredient list',
                        },
                        {
                          value: ' ',
                        },
                      ],
                    },
                  ],
                },
                ingredients: {
                  content: [
                    {
                      content: [
                        {
                          value:
                            'Isododecane, Dimethicone, Microcrystalline Wax, Bentonite, Methyl Methacrylate Crosspolymer, Polymethylsilsesquioxane, Propylene Carbonate, Phenoxyethanol, Buxus Chinensis Oil, Coconut Oil, Tridecyl trimellitate, Titanium Dioxide, D&C Red No.6 (CI 15850). ',
                        },
                      ],
                    },
                  ],
                },
                price: 19.95,
                sku:
                  'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xNTYxNDQ3NTI3MjI1MQ==',
                productCopy: {
                  content: [
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value:
                            'Introducing BATCH—001, our first ever run from Lipslut Lab!',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value:
                            '"02" matte liquid lipstick is a cool deep fuchsia, and is perfect for a bold pop of color. ',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value:
                            "We've been working hard behind the scenes to create a full line of Lipslut product! For those of you who just can't wait, here's a chance to get your hands on new shades early. We want you to be a part of our development process! \n  \n",
                          nodeType: 'text',
                          marks: [],
                        },
                        {
                          value: '*Limited run of 500 pieces. ',
                          nodeType: 'text',
                          marks: [
                            {
                              type: 'bold',
                            },
                          ],
                        },
                        {
                          value: 'Pre-order it while you can.',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: '**Shipping:',
                          nodeType: 'text',
                          marks: [
                            {
                              type: 'bold',
                            },
                          ],
                        },
                        {
                          value: ' to begin in 6-8 weeks as of October 1st.',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: 'Claims: Cruelty-free, Vegan. ',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: 'Size: 0.11 fl oz. / 3.25 ml',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                  ],
                },
                images: [
                  {
                    file: {
                      url:
                        '//images.ctfassets.net/ubhny9w4s07i/3kgXSrqHcsoWS24Ak6ueQo/6f339af9973147f536770790d08d6c0a/00102_tube.png',
                    },
                  },
                  {
                    file: {
                      url:
                        '//images.ctfassets.net/ubhny9w4s07i/3zEznKNPXqmMwEk6ia8GOI/a46b8cebeee6840873663b9c88279737/00102_lips.png',
                    },
                  },
                  {
                    file: {
                      url:
                        '//images.ctfassets.net/ubhny9w4s07i/5w2EciE91KKwEGyki4C6Q2/f84dcced4cce24f65812ebcb0d235fcb/00102_middle_finger.png',
                    },
                  },
                ],
              },
            },
            {
              node: {
                title: 'F*ck Kavanaugh',
                claims: {
                  content: [
                    {
                      nodeType: 'heading-5',
                      content: [
                        {
                          value: 'What is it?',
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value:
                            'A long wearing liquid lipstick with a matte finish.',
                        },
                      ],
                    },
                    {
                      nodeType: 'heading-5',
                      content: [
                        {
                          value: 'How to use:',
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value:
                            'Smooth a thin layer onto lips user our angled applicator for a bold pop of all day color. ',
                        },
                      ],
                    },
                    {
                      nodeType: 'heading-5',
                      content: [
                        {
                          value: 'Claims:',
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: 'Cruelty Free, Paraben Free, Vegan. ',
                        },
                      ],
                    },
                    {
                      nodeType: 'heading-5',
                      content: [
                        {
                          value: 'Key Ingredients: ',
                        },
                      ],
                    },
                    {
                      nodeType: 'heading-6',
                      content: [
                        {
                          value: 'Color-Lock Technology',
                        },
                      ],
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
                      content: [
                        {
                          value: 'Coconut + Jojoba Oil',
                        },
                      ],
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
                    {
                      nodeType: 'heading-6',
                      content: [
                        {
                          value: 'Vitamin E',
                        },
                      ],
                    },
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
                      content: [
                        {
                          value: 'Full ingredient list',
                        },
                        {
                          value: ' ',
                        },
                      ],
                    },
                  ],
                },
                ingredients: {
                  content: [
                    {
                      content: [
                        {
                          value:
                            'Isododecane, Dimethicone, Microcrystalline Wax, Bentonite, Methyl Methacrylate Crosspolymer, Polymethylsilsesquioxane, Propylene Carbonate, Phenoxyethanol, Buxus Chinensis Oil, Coconut Oil, Tridecyl trimellitate, Titanium Dioxide, Iron Oxide Red. ',
                        },
                      ],
                    },
                  ],
                },
                price: 19.95,
                sku:
                  'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xNTYxNDM4Mzg4MjI5OQ==',
                productCopy: {
                  content: [
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value:
                            'Nominated by you, F*ck Kavanaugh matte liquid lipstick is a cool, calm, and collected deep red.',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value:
                            'In the wake of recent allegations, 50% of all earnings from F*ck Kavanaugh go towards helping anti-sexual assault organizations. These organizations are to be chosen by the people, as with every lipstick purchased comes an opportunity to vote. ',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: '50% towards charity, 100% against assault.',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: '*Pre-order:',
                          nodeType: 'text',
                          marks: [
                            {
                              type: 'bold',
                            },
                          ],
                        },
                        {
                          value:
                            ' all orders including this product to begin in 6-8 weeks (as of October 1st).',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: 'Claims: Cruelty-free, Vegan. ',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: 'Size: 0.11 fl oz. / 3.25 ml',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                  ],
                },
                images: [
                  {
                    file: {
                      url:
                        '//images.ctfassets.net/ubhny9w4s07i/6jMyEgtVjqy0q6aSW2oEKw/0c04ff3b0e3c8b1cc43595e2e540a692/news-kav2.png',
                    },
                  },
                  {
                    file: {
                      url:
                        '//images.ctfassets.net/ubhny9w4s07i/oghHL8zJy8aSoMGksY2y/2f106a64fc364266d10b3072519408fb/kav-middle-finger.png',
                    },
                  },
                  {
                    file: {
                      url:
                        '//images.ctfassets.net/ubhny9w4s07i/1kDUklWWHCKY4yg0C4Msmi/e881833f2998acd5959ae9c6e9aef5c5/kav-lips.png',
                    },
                  },
                ],
              },
            },
            {
              node: {
                title: 'F*ck Hollywood.',
                claims: {
                  content: [
                    {
                      nodeType: 'heading-5',
                      content: [
                        {
                          value: 'What is it?',
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value:
                            'A long wearing liquid lipstick with a matte finish.',
                        },
                      ],
                    },
                    {
                      nodeType: 'heading-5',
                      content: [
                        {
                          value: 'How to use:',
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value:
                            'Smooth a thin layer onto lips user our angled applicator for a bold pop of all day color. ',
                        },
                      ],
                    },
                    {
                      nodeType: 'heading-5',
                      content: [
                        {
                          value: 'Claims:',
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: 'Cruelty Free, Paraben Free, Vegan. ',
                        },
                      ],
                    },
                    {
                      nodeType: 'heading-5',
                      content: [
                        {
                          value: 'Key Ingredients: ',
                        },
                      ],
                    },
                    {
                      nodeType: 'heading-6',
                      content: [
                        {
                          value: 'Color-Lock Technology',
                        },
                      ],
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
                      content: [
                        {
                          value: 'Coconut + Jojoba Oil',
                        },
                      ],
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
                    {
                      nodeType: 'heading-6',
                      content: [
                        {
                          value: 'Vitamin E',
                        },
                      ],
                    },
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
                      content: [
                        {
                          value: 'Full ingredient list',
                        },
                        {
                          value: ' ',
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: '',
                        },
                      ],
                    },
                  ],
                },
                ingredients: {
                  content: [
                    {
                      content: [
                        {
                          value:
                            'Isododecane, Dimethicone, Microcrystalline Wax, Bentonite, Methyl Methacrylate Crosspolymer, Polymethylsilsesquioxane, Propylene Carbonate, Phenoxyethanol, Buxus Chinensis Oil, Coconut Oil, Tridecyl trimellitate, Titanium Dioxide, Red 28 Lake(CI 45410). ',
                        },
                      ],
                    },
                  ],
                },
                price: 19.95,
                sku:
                  'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xNTU2MjEwODMzODIzNQ==',
                productCopy: {
                  content: [
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value:
                            'Ready for the red carpet, F*ck Hollywood matte liquid lipstick is an outspoken true red.',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value:
                            'In response to recent scandals, 50% of all earnings from F*ck Hollywood go towards helping anti-sexual assault organizations. These organizations are to be chosen by the people, as with every lipstick purchased comes an opportunity to vote.  ',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: '50% towards charity, 100% against abuse. ',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: 'Claims: Cruelty-free, Vegan. ',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: 'Size: 0.11 fl oz. / 3.25 ml',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                  ],
                },
                images: [
                  {
                    file: {
                      url:
                        '//images.ctfassets.net/ubhny9w4s07i/4fd0NCp7lS6yIKCc2o0wYO/257a74d31047788161e269e357b552d8/2_tubes_red.jpg',
                    },
                  },
                  {
                    file: {
                      url:
                        '//images.ctfassets.net/ubhny9w4s07i/2B2q9WPBpYgqIeQYEGeUss/0360c170203abb23b9198f9b35f249ad/hollywood_website_middle_finger.jpg',
                    },
                  },
                  {
                    file: {
                      url:
                        '//images.ctfassets.net/ubhny9w4s07i/4UENQTmUnmg4oSOKYOMAgc/5373c71987bad9152d6a0865c4d7a8fc/lip_home_page2.jpg',
                    },
                  },
                ],
              },
            },
            {
              node: {
                title: 'F*ck Trump.',
                claims: {
                  content: [
                    {
                      nodeType: 'heading-5',
                      content: [
                        {
                          value: 'What is it?',
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value:
                            'A long wearing liquid lipstick with a matte finish.',
                        },
                      ],
                    },
                    {
                      nodeType: 'heading-5',
                      content: [
                        {
                          value: 'How to use:',
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value:
                            'Smooth a thin layer onto lips user our angled applicator for a bold pop of all day color. ',
                        },
                      ],
                    },
                    {
                      nodeType: 'heading-5',
                      content: [
                        {
                          value: 'Claims:',
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: 'Cruelty Free, Paraben Free, Vegan. ',
                        },
                      ],
                    },
                    {
                      nodeType: 'heading-5',
                      content: [
                        {
                          value: 'Key Ingredients: ',
                        },
                      ],
                    },
                    {
                      nodeType: 'heading-6',
                      content: [
                        {
                          value: 'Color-Lock Technology',
                        },
                      ],
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
                      content: [
                        {
                          value: 'Coconut + Jojoba Oil',
                        },
                      ],
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
                    {
                      nodeType: 'heading-6',
                      content: [
                        {
                          value: 'Vitamin E',
                        },
                      ],
                    },
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
                      content: [
                        {
                          value: 'Full ingredient list',
                        },
                        {
                          value: ' ',
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: '',
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: '',
                        },
                      ],
                    },
                  ],
                },
                ingredients: {
                  content: [
                    {
                      content: [
                        {
                          value:
                            'Isododecane, Dimethicone, Microcrystalline Wax, Bentonite, Methyl Methacrylate Crosspolymer, Polymethylsilsesquioxane, Propylene Carbonate, Phenoxyethanol, Buxus Chinensis Oil, Coconut Oil, Tridecyl trimellitate, Titanium Dioxide, Red 28 Lake(CI 45410), Yellow 5 Lake.',
                        },
                      ],
                    },
                  ],
                },
                price: 19.95,
                sku:
                  'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xNTU2MTk2ODYxNTQ4Mw==',
                productCopy: {
                  content: [
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value:
                            'Selected by popular vote, F*ck Trump matte liquid lipstick is a balanced, mid-tone nude pink.',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value:
                            '50% of all earnings from F*ck Trump go towards helping a civil rights organization targeted by the Trump administration. This organization is to be chosen by the people, as with every lipstick purchased comes an opportunity to vote.  ',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: '50% towards charity, 100% against tyranny. ',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: 'Finally, a lipstick as bold as you. ',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: 'Claims: Cruelty-free, Vegan. ',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: 'Size: 0.11 fl oz. / 3.25 ml',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                  ],
                },
                images: [
                  {
                    file: {
                      url:
                        '//images.ctfassets.net/ubhny9w4s07i/70BVECqnK0IeiCQIeKqQAC/5625b5a6f6503cd0d3e1027b462ea2b2/newslite_large.jpg',
                    },
                  },
                  {
                    file: {
                      url:
                        '//images.ctfassets.net/ubhny9w4s07i/2UJkIVxFoIisG4aYUsyIwC/085445e325ad12fcc18c000a7739bce4/website_middle_finger_web_copy.jpg',
                    },
                  },
                  {
                    file: {
                      url:
                        '//images.ctfassets.net/ubhny9w4s07i/6d5UPQOuVqycocmeeCUwmw/95965e7cca965044188958bb870cc3ff/website_lips_web_copy.jpg',
                    },
                  },
                ],
              },
            },
            {
              node: {
                title: 'Lipslut Hat.',
                claims: null,
                ingredients: null,
                price: 29.95,
                sku:
                  'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xNTYxNDY5MDE2NDc5NQ==',
                productCopy: {
                  content: [
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value:
                            'Help our community grow by bringing us into the real world!',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value:
                            'The Lipslut hat is an unstructured 6-panel cap featuring our iconic swatch logo on the front. Made with breathable cotton, a curved brim, and a slouched silhouette, it’s the perfect hat for everyday. ',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          value: 'Adjustable unisex sizing—one size fits most.',
                          nodeType: 'text',
                          marks: [],
                        },
                      ],
                    },
                  ],
                },
                images: [
                  {
                    file: {
                      url:
                        '//images.ctfassets.net/ubhny9w4s07i/6uuQKuq2issQoqsc8esEoS/d39b395936042624398c4cd6483ad462/FullSizeRender.jpg',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    }

    const tree = renderer.create(<ProductsStage data={data} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
