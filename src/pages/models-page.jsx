import React from 'react'
import LoadPage from './load-page.jsx'
import PageTemplate from '../components/page-template.jsx'
import api from '../api.js'

class ModelsPage extends LoadPage {
  constructor(props) {
    super(props)

    this.state.ascending = true
    this.state.searchValue = this.props.match.params.search || ''
    this.state.sortBy = 'name'
  }

  apiGet = () => {
    api.index('models', this.apiSuccess, this.apiFailure)
  }

  renderOutput = () => {
    const columns = [
      { label: 'Name', key: 'name' },
      { label: 'OEM Name', key: 'oemName' },
    ]

    return (
      <PageTemplate
        ascending={this.state.ascending}
        columns={columns}
        data={this.state.data}
        nameLink='models'
        namePlural='Models'
        nameSingular='Model'
        onChange={this.handleChange}
        searchValue={this.state.searchValue}
        sortBy={this.state.sortBy}
      />
    )
  }
}

export default ModelsPage
