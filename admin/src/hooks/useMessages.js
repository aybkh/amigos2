import { useState, useEffect, useCallback } from 'react'
import { messagesService } from '../services/messagesService'

export function useMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(() => {
    setLoading(true)
    messagesService.getAll()
      .then(setMessages)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  return { messages, loading, error, reload: load }
}
