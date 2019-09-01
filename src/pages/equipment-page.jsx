import React from 'react'
import PageTemplate from '../components/page-template.jsx'
import api from '../api.js'
import { Spinner, Heading } from '@instructure/ui-elements'
import { Alert } from '@instructure/ui-alerts'

class EquipmentPage extends React.Component {
  constructor(props) {
    super(props)

    this.columns = [
      { label: 'Serial Number', key: 'serialNumber' },
      { label: 'OEM Name', key: 'oemName' },
      { label: 'Model Name', key: 'modelName' },
      { label: 'Type Name', key: 'typeName' },
    ]

    // this.startingSearch = (location.state && location.state.search) || ''
    this.startingSearch = ''

    this.state = { loading: true, data: [], error: null }
  }

  componentDidMount() {
    const success = result => {
      this.setState({ loading: false, data: result })
    }

    const failure = error => {
      this.setState({ loading: false, error })
    }

    api.getEquipment(success, failure)
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <Heading level='h1' margin='medium'>
            Equipment
          </Heading>
          <Spinner renderTitle='Loading' size='large' />
        </div>
      )
    }

    if (this.state.error) {
      return (
        <div>
          <Heading level='h1' margin='medium'>
            Equipment
          </Heading>
          <Alert variant='error'>{this.state.error}</Alert>
        </div>
      )
    }

    return (
      <PageTemplate
        columns={this.columns}
        data={this.state.data}
        link='/equipment/'
        namePlural='Equipment'
        nameSingular='Equipment'
        startingSearch={this.startingSearch}
        startingSortBy='serialNumber'
      />
    )
  }
}

export default EquipmentPage
