import React, { Component } from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3rem;
  img {
    flex-basis: 50%;
    max-height: 33rem;
    max-width: 30rem;
  }
  .aboutCopy {
    display: flex;
    flex-direction: column;
    flex-basis: 50%;
    padding-left: 1rem;
  }
  h1 {
    font-size: 3.5rem;
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
  @media (max-width: 850px) {
    flex-direction: column;
    align-items: center;
    padding: 3rem;
    img {
      width: 100%;
    }
    h1 {
      text-align: center;
    }
  }
  @media (max-width: 420px) {
    padding: 1rem;
  }
`
class About extends Component {
  componentDidMount() {
    this.props.resetSidebar()
  }
  render() {
    const aboutImage = this.props.data.contentfulSupportPage.images[0].fluid.src
    const aboutCopy = this.props.data.contentfulSupportPage.copy.content.map(
      line => {
        if (line.nodeType === 'heading-1')
          return <h1>{line.content[0].value}</h1>
        else if (line.nodeType === 'paragraph')
          return <p>{line.content[0].value}</p>
        return ''
      }
    )
    return (
      <Container>
        <img src={aboutImage} alt="2017 Women's March" />
        <div className="aboutCopy">{aboutCopy}</div>
      </Container>
    )
  }
}

export const query = graphql`
  {
    contentfulSupportPage(pageName: { eq: "About" }) {
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

export default About
