import React, { Component } from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 3rem;
  .article {
    max-height: 20rem;
    max-width: 20rem;
    margin-bottom: 1rem;
  }
  img {
    border-radius: 3px;
    position: relative;
    margin: 0;
    max-height: 20rem;
    min-height: 15rem;
    min-width: 20rem;
  }
  p {
    margin: 0;
    padding: 1rem;
    font-size: 1.5rem;
    position: relative;
    top: 5rem;
    z-index: 2;
    text-align: center;
    height: 0;
    text-shadow: 0px 0px 10px black;
  }
  a {
    color: white;
    transition: 0.3s;
  }
  a:hover {
    text-decoration: underline;
    img {
      opacity: 50%;
    }
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
  }
`

class Contact extends Component {
  componentDidMount() {
    this.props.resetSidebar()
  }
  render() {
    const images = this.props.data.contentfulSupportPage.images
    const PressArticles = this.props.data.contentfulSupportPage.copy.content.map(
      (line, i) => (
        <a href={line.content[1].data.uri}>
          <div className="article">
            <p>{line.content[1].content[0].value}</p>
            <img
              src={images[i].fluid.src}
              target="_blank"
              rel="noopener noreferrer"
            />
          </div>
        </a>
      )
    )
    return <Container>{PressArticles}</Container>
  }
}
export const query = graphql`
  {
    contentfulSupportPage(pageName: { eq: "Press" }) {
      images {
        fluid {
          src
        }
      }
      copy {
        content {
          nodeType
          content {
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
