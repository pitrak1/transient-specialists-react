import React from 'react'
import PageTemplate from '../components/page-template.jsx'
import api from '../api.js'

const OemsPage = () => {
  const columns = [{ label: 'Name', key: 'name' }]

  // const startingSearch = (location.state && location.state.search) || ''
  const startingSearch = ''

  return (
    <PageTemplate
      apiGet={api.get}
      columns={columns}
      nameLink='oems'
      namePlural='OEMs'
      nameSingular='OEM'
      startingSearch={startingSearch}
      startingSortBy='name'
    />
  )
}

export default OemsPage
