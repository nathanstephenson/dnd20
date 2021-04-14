import React from 'react'

/* export const UserContext = React.createContext(null); */

export const UserContext = React.createContext({
    user: null,
    refreshUser: () => {},
    toggleNavBar: () => {},
})