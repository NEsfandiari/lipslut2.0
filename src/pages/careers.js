import React, { Component } from 'react'
import styled from 'styled-components'
import { graphql, Link } from 'gatsby'
import { StyledHr } from '../components/atoms'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 5rem 10rem;
  .copy {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  a {
    color: #00a6ff;
    transition: 0.3s;
  }
  a:hover {
    color: #9ae0f5;
  }
  h4 {
    font-size: 2rem;
    font-weight: bold;
  }
  p {
    text-align: center;
    font-size: 1rem;
  }
  .bolded {
    font-size: 1.3rem;
    font-weight: bold;
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
        if (line.nodeType === 'heading-4')
          return <h4>{line.content[0].value}</h4>
        else if (
          line.nodeType === 'paragraph' &&
          line.content[0].marks.length > 0
        )
          return <p className="bolded">{line.content[0].value}</p>
        else if (line.nodeType === 'paragraph')
          return <p>{line.content[0].value}</p>
        return ''
      }
    )
    return (
      <Container>
        <div className="copy">{contactCopy}</div>
        <StyledHr />
        <p className="bolded">
          No current listings, but always happy to chat! Tell us how you’re
          ready to make an impact.
        </p>
        <Link to="mailto:team@lipslut.com">team@lipslut.com</Link>
      </Container>
    )
  }
}
export const query = graphql`
  {
    contentfulSupportPage(pageName: { eq: "Careers" }) {
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

export default Contact
