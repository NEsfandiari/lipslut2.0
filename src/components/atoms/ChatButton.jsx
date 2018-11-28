import React, { Component } from 'react'
import styled from 'styled-components'
import { graphql, StaticQuery } from 'gatsby'

// TODO: adjust positioning for tablet view
const Container = styled.button`
  position: fixed;
  right: 1.5rem;
  bottom: 1rem;
  z-index: 9999;
  padding: 0;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
`

const Image = styled.img`
  width: 1rem;
  height: 1rem;
  margin: 0;
`

// Query Contentful for icon to use in chat messenger button
const query = graphql`
  {
    contentfulHomePage {
      chatIcon {
        file {
          url
        }
      }
    }
  }
`

class ChatButton extends Component {
  handleClick = () => {
    window.Chatra('openChat', true)
  }

  render() {
    return (
      <StaticQuery
        query={query}
        render={data => (
          <Container onClick={this.handleClick}>
            <Image
              src={data.contentfulHomePage.chatIcon.file.url}
              alt="chat button"
            />
          </Container>
        )}
      />
    )
  }
}

export default ChatButton
