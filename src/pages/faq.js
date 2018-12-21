import React, { Component } from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 8rem;
  .questions {
    margin-top: 1rem;
  }
  h3 {
    margin-top: 3rem;
  }
  p {
    line-height: 1.5rem;
  }
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
    const header = this.props.data.contentfulSupportPage.copy.content[0]
      .content[0].value
    const faqs = this.props.data.contentfulSupportPage.copy.content.map(faq => {
      if (faq.nodeType === 'heading-1')
        return (
          <>
            <h1>{faq.content[0].value}</h1>
          </>
        )
      if (faq.nodeType === 'heading-3')
        return (
          <>
            <h3>{faq.content[0].value}</h3>
          </>
        )
      else if (faq.nodeType === 'paragraph')
        return <p>{faq.content[0].value}</p>
      return ''
    })
    return (
      <Container>
        <h1>
          <b>{header}</b>
        </h1>
        <div className="questions">{faqs}</div>
      </Container>
    )
  }
}
export const query = graphql`
  {
    contentfulSupportPage(pageName: { eq: "Faq" }) {
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

export default Faq
