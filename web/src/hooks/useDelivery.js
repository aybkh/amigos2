import { useState, useEffect } from 'react'
import { deliveryService } from '../services/deliveryService'

export function useDelivery() {
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    deliveryService.getActive()
      .then(setLinks)
      .catch(() => setLinks([]))
      .finally(() => setLoading(false))
  }, [])

  return { links, loading }
}
