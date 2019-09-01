import React from 'react'
import PageTemplate from '../components/page-template.jsx'
import api from '../api.js'

const EquipmentPage = () => {
  const columns = [
    { label: 'Serial Number', key: 'serialNumber' },
    { label: 'OEM Name', key: 'oemName' },
    { label: 'Model Name', key: 'modelName' },
    { label: 'Type Name', key: 'typeName' },
  ]

  // const startingSearch = (location.state && location.state.search) || ''
  const startingSearch = ''

  return (
    <PageTemplate
      apiIndex={api.index}
      columns={columns}
      nameLink='equipment'
      namePlural='Equipment'
      nameSingular='Equipment'
      startingSearch={startingSearch}
      startingSortBy='serialNumber'
    />
  )
}

export default EquipmentPage
