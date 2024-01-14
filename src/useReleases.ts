import {useMemo} from 'react'

import data from './data'
import {useData} from './useData'

export type ReleaseData = typeof data
export type SorterName = 'title-ascending' | 'title-descending' | 'year-ascending' | 'year-descending'

export type Release = ReleaseData['releases'][number]

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
  const {data, error, loading} = useData<ReleaseData>()

  const releases = useMemo(() => {
    if (!data) return []

    const {releases} = data

    return releases || []
  }, [data])


  const sortedReleases = useMemo(() => (
    releases.sort(sorters[sorterName])
  ), [releases, sorterName])

  return {error, loading, releases: sortedReleases}
}
