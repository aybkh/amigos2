import { useState, useEffect } from 'react'
import { postsService } from '../services/postsService'
import { HOME_POSTS_LIMIT } from '../lib/constants'

export function usePosts({ recent = false } = {}) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetch = recent
      ? postsService.getRecent(HOME_POSTS_LIMIT)
      : postsService.getAll()

    fetch
      .then(setPosts)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [recent])

  return { posts, loading, error }
}
