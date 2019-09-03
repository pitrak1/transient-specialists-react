import React from 'react'
import LoadPage from './load-page.jsx'
import PageTemplate from '../components/page-template.jsx'
import api from '../api.js'

class OemsPage extends LoadPage {
  constructor(props) {
    super(props)

    this.state.ascending = true
    this.state.searchValue = ''
    this.state.sortBy = 'name'
  }

  apiGet = () => {
    api.index('oems', this.apiSuccess, this.apiFailure)
  }

  renderOutput = () => {
    const columns = [{ label: 'Name', key: 'name' }]

    return (
      <PageTemplate
        ascending={this.state.ascending}
        columns={columns}
        data={this.state.data}
        nameLink='oems'
        namePlural='OEMs'
        nameSingular='OEM'
        onChange={this.handleChange}
        searchValue={this.state.searchValue}
        sortBy={this.state.sortBy}
      />
    )
  }
}

export default OemsPage
