import React from 'react'
import { Spinner } from '@instructure/ui-elements'
import { Alert } from '@instructure/ui-alerts'
import PageTemplate from '../components/page-template.jsx'
import api from '../api.js'

class EquipmentPage extends React.Component {
  state = {
    alert: null,
    ascending: true,
    data: {},
    error: null,
    loading: true,
    searchValue: this.props.match.params.search || '',
    sortBy: 'serialNumber',
  }

  componentDidMount() {
    api.getIndex(
      'equipment',
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
    const columns = [
      { label: 'Serial Number', key: 'serialNumber' },
      { label: 'OEM Name', key: 'oemName' },
      { label: 'Model Name', key: 'modelName' },
      { label: 'Type Name', key: 'typeName' },
    ]

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
          nameLink='equipment'
          namePlural='Equipment'
          nameSingular='Equipment'
          onChange={this.handleChange}
          searchValue={this.state.searchValue}
          sortBy={this.state.sortBy}
        />
      </div>
    )
  }
}

export default EquipmentPage
