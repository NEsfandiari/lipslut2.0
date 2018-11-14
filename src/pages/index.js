import React, { Component } from 'react'
import Styled from 'styled-components'
import 'futura-font/styles.css'
import { HomePageFeatured } from '../components'
import {
  MissionStatements,
  MissionPhilosophy,
  MediaHighlights,
} from '../components/molecules'

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
    return (
      <Container>
        <HomePageFeatured />
        <MissionStatements />
        <MissionPhilosophy />
        <MediaHighlights />
      </Container>
    )
  }
}

export default IndexPage
