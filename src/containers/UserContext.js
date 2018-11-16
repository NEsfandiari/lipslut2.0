// Upgrade to use Context API if Necessary! Not Necessary Yet for userInfo I only Drill 2-3 levels deep

import React from 'react'

const UserContext = React.createContext({})

export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer
