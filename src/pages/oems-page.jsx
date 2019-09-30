import React from 'react'
import { Spinner } from '@instructure/ui-elements'
import { Alert } from '@instructure/ui-alerts'
import PageTemplate from '../components/page-template.jsx'
import api from '../api.js'

class OemsPage extends React.Component {
  state = {
    alert: null,
    ascending: true,
    data: {},
    error: null,
    loading: true,
    searchValue: '',
    sortBy: 'name',
  }

  componentDidMount() {
    api.getIndex(
      'oems',
      result => {
        this.setState({ loading: false, data: result })
      },
      error => {
        this.setState({ loading: false, error })
      },
    )
  }

  handleChange = object => {
    this.setState(object)
  }

  render() {
    const columns = [{ label: 'Name', key: 'name' }]

    if (this.state.loading) {
      return <Spinner renderTitle='Loading' size='large' />
    }

    if (this.state.error) {
      return <Alert variant='error'>{this.state.error}</Alert>
    }

    return (
      <div>
        {this.state.alert && <Alert variant='error'>{this.state.alert}</Alert>}
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
      </div>
    )
  }
}

export default OemsPage
