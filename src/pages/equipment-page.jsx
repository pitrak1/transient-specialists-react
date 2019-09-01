import React from 'react'
import PageTemplate from '../components/page-template.jsx'
import api from '../api.js'
import { Spinner } from '@instructure/ui-elements'
import { Heading } from '@instructure/ui-elements'

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

    this.state = { loading: true, data: [] }
  }

  componentDidMount() {
    const success = result => {
      this.setState({ loading: false, data: result })
    }

    const failure = error => {}

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
