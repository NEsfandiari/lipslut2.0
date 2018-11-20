import React, { Component } from 'react'
import Styled from 'styled-components'
import 'futura-font/styles.css'
import {
  HomePageFeatured,
  HomePageMissionStatements,
  HomePageMissionPhilosophy,
  HomePageMediaHighlights,
} from '../components'
import { graphql } from 'gatsby'

const Container = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadein 1s;
  @keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }
`

class IndexPage extends Component {
  componentDidMount() {
    this.props.resetSidebar()
  }

  render() {
    const contentfulData = this.props.data.contentfulHomePage
    const titles = contentfulData.featuredProductTitles
    const photos = contentfulData.featuredProductPhotos
    const quotes = contentfulData.mediaHighlightQuotes
    const logos = contentfulData.mediaHighlightLogos
    const philosophyCopy = contentfulData.philosophy.content
    const statementsCopy = contentfulData.mission.content
    return (
      <Container>
        <HomePageFeatured titles={titles} photos={photos} />
        <HomePageMissionStatements statementsCopy={statementsCopy} />
        <HomePageMissionPhilosophy philosophyCopy={philosophyCopy} />
        <HomePageMediaHighlights quotes={quotes} logos={logos} />
      </Container>
    )
  }
}
export const query = graphql`
  {
    contentfulHomePage(pageName: { eq: "Home Page V1" }) {
      featuredProductTitles
      featuredProductPhotos {
        fluid {
          src
        }
      }
      mission {
        content {
          nodeType
          content {
            value
            nodeType
          }
        }
      }
      philosophy {
        content {
          nodeType
          content {
            value
            nodeType
          }
        }
      }
      mediaHighlightQuotes
      mediaHighlightLogos {
        fluid {
          src
        }
      }
    }
  }
`
export default IndexPage
