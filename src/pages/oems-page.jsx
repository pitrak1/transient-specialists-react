import React from 'react'
import PageTemplate from '../components/page-template.jsx'
import api from '../api.js'

const OemsPage = () => {
  const columns = [{ label: 'Name', key: 'name' }]

  // const startingSearch = (location.state && location.state.search) || ''
  const startingSearch = ''

  return (
    <PageTemplate
      apiGet={api.getOems}
      columns={columns}
      link='/oems/'
      namePlural='OEMs'
      nameSingular='OEM'
      startingSearch={startingSearch}
      startingSortBy='name'
    />
  )
}

export default OemsPage
