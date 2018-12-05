import React, { Component } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { graphql } from 'gatsby'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5rem 10rem;
  a {
    color: #9ae0f5;
    transition: 0.3s;
  }
  a:hover {
    color: #b7f2ff;
  }
  h1 {
    font-size: 4rem;
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

class Contact extends Component {
  componentDidMount() {
    this.props.resetSidebar()
  }
  render() {
    const contactCopy = this.props.data.contentfulSupportPage.copy.content.map(
      line => {
        if (line.nodeType === 'heading-1')
          return <h1>{line.content[0].value}</h1>
        else if (line.nodeType === 'paragraph' && line.content.length > 1)
          return (
            <p>
              {line.content[0].value}
              <Link to={line.content[1].data.uri}>
                {line.content[1].content[0].value}
              </Link>
            </p>
          )
        else if (line.nodeType === 'paragraph')
          return <p>{line.content[0].value}</p>
        return ''
      }
    )
    return <Container>{contactCopy}</Container>
  }
}
export const query = graphql`
  {
    contentfulSupportPage(pageName: { eq: "Contact" }) {
      id
      pageName
      images {
        id
        fluid {
          src
        }
      }
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

export default Contact
