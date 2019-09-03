import React from 'react'
import LoadPage from './load-page.jsx'
import PageTemplate from '../components/page-template.jsx'
import api from '../api.js'

class EquipmentPage extends LoadPage {
  constructor(props) {
    super(props)

    this.state.ascending = true
    this.state.searchValue = this.props.match.params.search || ''
    this.state.sortBy = 'serialNumber'
  }

  apiGet = () => {
    api.index('equipment', this.apiSuccess, this.apiFailure)
  }

  renderOutput = () => {
    const columns = [
      { label: 'Serial Number', key: 'serialNumber' },
      { label: 'OEM Name', key: 'oemName' },
      { label: 'Model Name', key: 'modelName' },
      { label: 'Type Name', key: 'typeName' },
    ]

    return (
      <PageTemplate
        ascending={this.state.ascending}
        columns={columns}
        data={this.state.data}
        nameLink='equipment'
        namePlural='Equipment'
        nameSingular='Equipment'
        onChange={this.handleChange}
        searchValue={this.state.searchValue}
        sortBy={this.state.sortBy}
      />
    )
  }
}

export default EquipmentPage
