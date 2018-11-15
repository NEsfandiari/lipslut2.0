import React from 'react'
import FirebaseProvider from './src/containers/FirebaseProvider'
import firebase from './src/utilities/firebase'

export const wrapRootElement = ({ element }) => {
  const ConnectedRouterWrapper = () => (
    <FirebaseProvider firebase={firebase}>{element}</FirebaseProvider>
  )
  return ConnectedRouterWrapper
}
