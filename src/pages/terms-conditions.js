import React, { Component } from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
  @media (max-width: 420px) {
    padding: 1rem;
  }
`
class TermsConditions extends Component {
  componentDidMount() {
    this.props.resetSidebar()
  }
  render() {
    const terms = this.props.data.contentfulSupportPage.copy.content.map(
      (term, i) => <p key={i}>{term.content[0].value}</p>
    )
    return <Container>{terms}</Container>
  }
}
export const query = graphql`
  {
    contentfulSupportPage(pageName: { eq: "Terms & Conditions" }) {
      id
      pageName
      copy {
        content {
          nodeType
          content {
            value
            marks {
              type
            }
            nodeType
            content {
              value
              nodeType
            }
            data {
              uri
            }
          }
        }
      }
    }
  }
`

export default TermsConditions
