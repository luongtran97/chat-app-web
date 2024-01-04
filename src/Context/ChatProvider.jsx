import { createContext, useEffect, useState } from 'react'
import { localService } from '~/config/localService'

// eslint-disable-next-line react-refresh/only-export-components
export const chatContext = createContext({})
export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState({})
  useEffect(() => {
    setUser (localService.getItem('USER_INFO'))
  }, [])
  return (
    <chatContext.Provider value={{ user, setUser } }>
      {children}
    </chatContext.Provider>
  )
}
