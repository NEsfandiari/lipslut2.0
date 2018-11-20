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
class PrivacyPolicy extends Component {
  componentDidMount() {
    this.props.resetSidebar()
  }
  render() {
    const policies = this.props.data.contentfulSupportPage.copy.content.map(
      (policy, i) => <p key={i}>{policy.content[0].value}</p>
    )
    return <Container>{policies}</Container>
  }
}
export const query = graphql`
  {
    contentfulSupportPage(pageName: { eq: "Privacy Policy" }) {
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
export default PrivacyPolicy
