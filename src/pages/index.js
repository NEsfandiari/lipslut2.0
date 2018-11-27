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

    //Refactored query to filter out emtpy strings and header text
    const statementsCopy = contentfulData.mission.content
      .filter(
        statement =>
          statement.nodeType === 'paragraph' &&
          statement.content[0].value !== ''
      )
      .map(content => content.content[0].value)

    //Pulled out mission header
    const missionHeader = contentfulData.mission.content[0].content[0].value

    //Pulled out mission icon image urls
    const missionIcons = contentfulData.missionIcons.map(src => src.fluid.src)

    return (
      <Container>
        <HomePageFeatured titles={titles} photos={photos} />

        {/* passed mission statement icons and header as props */}
        <HomePageMissionStatements
          statementsCopy={statementsCopy}
          missionIcons={missionIcons}
          missionHeader={missionHeader}
        />
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
      missionIcons {
        title
        fluid {
          src
        }
      }
      navbarItems {
        data {
          icon
          dropdown
          navButton
          dropdownLinks {
            name
            route
          }
        }
      }
    }
  }
`
export default IndexPage
