import { useState, useEffect, useCallback } from 'react'
import { menuService } from '../services/menuService'

export function useMenu() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(() => {
    setLoading(true)
    menuService.getCategories()
      .then(setCategories)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  return { categories, loading, error, reload: load }
}
