import { useState, useEffect } from 'react'
import { heroMediaService } from '../services/heroMediaService'

export function useHeroMedia() {
  const [media, setMedia] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    heroMediaService.getActive()
      .then(setMedia)
      .finally(() => setLoading(false))
  }, [])

  return { media, loading }
}
