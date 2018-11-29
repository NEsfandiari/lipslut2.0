import React, { Component } from 'react'
import styled from 'styled-components'
import lightBlue from '../../layouts/lightBlue'
import { graphql, StaticQuery } from 'gatsby'

const Container = styled.div``

const query = graphql`
  {
    allContentfulProductPage {
      edges {
        node {
          title
          claims {
            content {
              nodeType
              content {
                value
              }
            }
          }
          ingredients {
            content {
              content {
                value
              }
            }
          }
        }
      }
    }
  }
`

class ProductDetails extends Component {
  render() {
    return (
      <StaticQuery
        query={query}
        render={data => {
          console.log(data)
          return <Container>asdf</Container>
        }}
      />
    )
  }
}

export default lightBlue(ProductDetails)
