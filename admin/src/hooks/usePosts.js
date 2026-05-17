import { useState, useEffect, useCallback } from 'react'
import { postsService } from '../services/postsService'

export function usePosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(() => {
    setLoading(true)
    postsService.getAll()
      .then(setPosts)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  return { posts, loading, error, reload: load }
}
