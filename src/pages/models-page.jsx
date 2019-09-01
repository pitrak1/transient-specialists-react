import React from 'react'
import PageTemplate from '../components/page-template.jsx'
import api from '../api.js'

const ModelsPage = () => {
  const columns = [
    { label: 'Name', key: 'name' },
    { label: 'OEM Name', key: 'oemName' },
  ]

  // const startingSearch = (location.state && location.state.search) || ''
  const startingSearch = ''

  return (
    <PageTemplate
      apiGet={api.getModels}
      columns={columns}
      link='/models/'
      namePlural='Models'
      nameSingular='Model'
      startingSearch={startingSearch}
      startingSortBy='name'
    />
  )
}

export default ModelsPage
