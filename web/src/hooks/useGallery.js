import { useState, useEffect } from 'react'
import { galleryService } from '../services/galleryService'
import { HOME_GALLERY_LIMIT } from '../lib/constants'

export function useGallery({ preview = false } = {}) {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetch = preview
      ? galleryService.getPreview(HOME_GALLERY_LIMIT)
      : galleryService.getAll()

    fetch
      .then(setPhotos)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [preview])

  return { photos, loading, error }
}
