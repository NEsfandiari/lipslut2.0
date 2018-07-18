import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { Navbar, Footer } from '../components'
import './index.css'

const Layout = ({ children, data }) => (
  <div>
    <Helmet
      title="Lipslut"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Navbar />
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
  </div>
)

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
