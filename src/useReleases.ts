import {useEffect, useMemo, useState} from 'react'

import data from './data'
import {fetchReleaseData} from './fetchReleaseData'

export type Release = typeof data['releases'][number]

export type SorterName = 'title-ascending' | 'title-descending' | 'year-ascending' | 'year-descending'

export const sorters: Record<SorterName, (a: Release, b: Release) => number> = {
  'title-ascending': (a, b) => (a.title.localeCompare(b.title)),
  'title-descending': (a, b) => (b.title.localeCompare(a.title)),
  'year-ascending': (a, b) => (a.year - b.year),
  'year-descending': (a, b) => (b.year - a.year),
} as const

export type UseReleasesOptions = {
  sorterName: SorterName
}
export function useReleases({sorterName}: UseReleasesOptions) {
  const [error, setError] = useState<typeof Error | null>(null)
  const [loading, setLoading] = useState(false)
  const [releases, setReleases] = useState<typeof data['releases']>([])

  const sortedReleases = useMemo(() => (
    releases.sort(sorters[sorterName])
  ), [releases, sorterName])

  useEffect(() => {
    let unmounted = false

    setLoading(true)

    fetchReleaseData()
      .then(data => {
        if (!unmounted) {
          setLoading(false)
          setReleases(data.releases)
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

  return {error, loading, releases: sortedReleases}
}
