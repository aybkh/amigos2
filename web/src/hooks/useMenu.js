import { useState, useEffect } from 'react'
import { menuService } from '../services/menuService'

export function useMenu() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    menuService.getCategories()
      .then(setCategories)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { categories, loading, error }
}
