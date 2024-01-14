import { useEffect, useState } from 'react'

import { fetchReleaseData } from './fetchReleaseData'

// TODO: add url parameter and real fetching
export function useData<T = Record<string, object>>() {
  const [error, setError] = useState<typeof Error | null>(null)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<T>()

  useEffect(() => {
    let unmounted = false

    setLoading(true)

    fetchReleaseData()
      .then(data => {
        if (!unmounted) {
          setLoading(false)
          setData(data as T)
        }
      })
      .catch(error => {
        if (!unmounted) {
          setLoading(false)
          setError(error)
        }
      })

    return () => {
      unmounted = true
    }
  }, [])

  return {data, error, loading}
}
