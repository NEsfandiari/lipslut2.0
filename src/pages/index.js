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
    const titles = this.props.data.contentfulHomePage.featuredProductTitles
    const photos = this.props.data.contentfulHomePage.featuredProductPhotos
    return (
      <Container>
        <HomePageFeatured titles={titles} photos={photos} />
        <HomePageMissionStatements />
        <HomePageMissionPhilosophy />
        <HomePageMediaHighlights />
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
    }
  }
`
export default IndexPage
