import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import { Navbar, Footer } from '../components'
import './index.css'

const Container = styled.div`
  h1, h2, h3, h4, p, a, label, button, input{
    font-family: 'futura';
  }
   h3, h4, p{
    font-weight: 100;
  }
  p{
    font-size: .9rem;
  }
  a{
      text-decoration: none;
  }
`
class Layout extends Component {
  state = {
    cart: ['fck-trump'],
  }

  handleCart = () => {
    console.log('hey')
  }
  render() {
    const { children, data } = this.props
    return (
      <Container>
        <Helmet
          title="Lipslut"
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <Navbar cart={this.state.cart} />
        <div
          style={{
            margin: '0 auto',
            maxWidth: 1260,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          {children()}
        </div>
        <Footer />
      </Container>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
