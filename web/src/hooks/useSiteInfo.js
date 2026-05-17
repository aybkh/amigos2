import { useState, useEffect } from 'react'
import { siteInfoService } from '../services/siteInfoService'

export function useSiteInfo() {
  const [siteInfo, setSiteInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    siteInfoService.get()
      .then(setSiteInfo)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { siteInfo, loading, error }
}
