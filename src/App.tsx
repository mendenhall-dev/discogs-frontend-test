import {useState} from 'react'

import './App.css'
import {useReleases} from './useReleases'

import type {SorterName} from './useReleases'

const baseUrl = '//discogs.com'
const recordLabel = {
  id: 245,
  name: 'R&S Records',
  slug: 'r-s-records',
} as const

const defaultSorterName = 'year-ascending'
const sorterDescriptions: Record<SorterName, string> = {
  'year-ascending': 'Sort by Year, A-Z',
  'year-descending': 'Sort by Year, Z-A',
  'title-ascending': 'Sort by Title, A-Z',
  'title-descending': 'Sort by Title, Z-A',
}

function App() {
  const [sorterName, setSorterName] = useState<SorterName>(defaultSorterName)

  const {error, loading, releases} = useReleases({sorterName})

  if (loading) {
    return 'Loading...'
  }

  if (error) {
    return 'Error fetching releases.'
  }

  if (!releases.length) {
    return 'No Releases.'
  }

  const handleSortingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sorterName = event.currentTarget.value as SorterName

    setSorterName(sorterName)
  }

  return (
    <div className="releases-section">
      <div className="releases-header">
        <h2>Releases from <a href={`${baseUrl}/label/${recordLabel.id}`}>{recordLabel.name}</a></h2>
        <form name="sort">
          <select className="release-sorting-select" name="sort" onChange={handleSortingChange}>
            {Object.entries(sorterDescriptions).map(([name, description]) => (
              <option key={name} value={name}>{description}</option>
            ))}
          </select>
        </form>
      </div>
      <div className="card-list release-list" >
        {releases.map((release) => (
          <a className="card release" href={`${baseUrl}/release/${release.id}`} key={release.id}>
            {release.thumb && (
              <img alt={`Album Art for ${release.title}`} src={release.thumb} />
            )}
            <div className="card-heading">{release.title}</div>
            <div className="card-details">
              <div className="card-details-row">
                <span>{release.title}</span>
                <span>{release.year || ''}</span>
              </div>
              <div className="card-details-row">
                <span>{release.artist}</span>
                <span>{release.catno}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default App
