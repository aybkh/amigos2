import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { messagesService } from '../services/messagesService'

const UnreadCountCtx = createContext({ count: 0, refresh: () => {} })

export function UnreadCountProvider({ children }) {
  const [count, setCount] = useState(0)

  const refresh = useCallback(() => {
    messagesService.getUnreadCount().then(setCount).catch(() => {})
  }, [])

  useEffect(() => { refresh() }, [refresh])

  return (
    <UnreadCountCtx.Provider value={{ count, refresh }}>
      {children}
    </UnreadCountCtx.Provider>
  )
}

export function useUnreadCount() {
  return useContext(UnreadCountCtx)
}
