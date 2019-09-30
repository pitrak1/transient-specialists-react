import React from 'react'
import { Spinner } from '@instructure/ui-elements'
import { Alert } from '@instructure/ui-alerts'
import { Heading, Text } from '@instructure/ui-elements'
import { Button } from '@instructure/ui-buttons'
import api from '../api.js'
import { withRouter } from 'react-router'

class EquipmentDetailsPage extends React.Component {
  state = {
    alert: null,
    data: {},
    error: null,
    loading: true,
  }

  componentDidMount() {
    api.getShow(
      'equipment',
      this.props.match.params.id,
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

  handleDeleteClick = () => {
    if (confirm('Are you sure you want to delete this equipment?')) {
      const success = _response => {
        this.props.history.push('/')
      }

      const failure = error => {
        this.setState({ loading: false, alert: error })
      }
      api.deleteDestroy('equipment', this.state.data.id, success, failure)
    }
  }

  render() {
    if (this.state.loading) {
      return <Spinner renderTitle='Loading' size='large' />
    }

    if (this.state.error) {
      return <Alert variant='error'>{this.state.error}</Alert>
    }

    const equipment = this.state.data
    const fields = [
      { label: 'ID: ', value: equipment.id },
      { label: 'Serial Number: ', value: equipment.serialNumber },
      { label: 'OEM ID: ', value: equipment.oemId },
      { label: 'OEM Name: ', value: equipment.oemName },
      { label: 'Model ID: ', value: equipment.modelId },
      { label: 'Model Name: ', value: equipment.modelName },
      { label: 'Type ID: ', value: equipment.typeId },
      { label: 'Type Name: ', value: equipment.typeName },
    ].map(field => (
      <div key={field.label}>
        <Text weight='bold'>{field.label}</Text>
        <Text>{field.value}</Text>
      </div>
    ))

    return (
      <div>
        {this.state.alert && <Alert variant='error'>{this.state.alert}</Alert>}
        <Heading level='h1' margin='medium'>
          {equipment.serialNumber}
        </Heading>
        {fields}
        <Button onClick={this.handleDeleteClick}>Delete</Button>
      </div>
    )
  }
}

export default withRouter(EquipmentDetailsPage)
