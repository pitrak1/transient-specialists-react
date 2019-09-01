import React from 'react'
import PageTemplate from '../components/page-template.jsx'
import api from '../api.js'

const TypesPage = () => {
  const columns = [{ label: 'Name', key: 'name' }]

  // const startingSearch = (location.state && location.state.search) || ''
  const startingSearch = ''

  return (
    <PageTemplate
      apiGet={api.get}
      columns={columns}
      nameLink='types'
      namePlural='Types'
      nameSingular='Type'
      startingSearch={startingSearch}
      startingSortBy='name'
    />
  )
}

export default TypesPage
