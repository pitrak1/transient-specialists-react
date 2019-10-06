import React from 'react'
import { Spinner } from '@instructure/ui-elements'
import { Alert } from '@instructure/ui-alerts'
import { Heading, Text } from '@instructure/ui-elements'
import { Button } from '@instructure/ui-buttons'
import { Table } from '@instructure/ui-table'
import api from '../api.js'
import { withRouter } from 'react-router'

export class EquipmentDetailsPage extends React.Component {
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
      api.deleteDestroy(
        'equipment',
        this.state.data.equipment.id,
        success,
        failure,
      )
    }
  }

  handleAddEventClick = () => {
    const id = this.state.data.equipment.id
    this.props.history.push(`/events/create/${id}`)
  }

  render() {
    if (this.state.loading) {
      return <Spinner renderTitle='Loading' size='large' />
    }

    if (this.state.error) {
      return <Alert variant='error'>{this.state.error}</Alert>
    }

    const equipment = this.state.data.equipment
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

    const events = this.state.data.events
    const rows = events.map(event => (
      <Table.Row key={event.id}>
        <Table.Cell>{event.status}</Table.Cell>
        <Table.Cell>{event.jobNumber}</Table.Cell>
        <Table.Cell>{event.companyNotes}</Table.Cell>
        <Table.Cell>{event.startDate}</Table.Cell>
        <Table.Cell>{event.endDate}</Table.Cell>
        <Table.Cell>{event.updatedAt}</Table.Cell>
      </Table.Row>
    ))

    return (
      <div>
        {this.state.alert && <Alert variant='error'>{this.state.alert}</Alert>}
        <Heading level='h1' margin='medium'>
          {equipment.serialNumber}
        </Heading>
        {fields}
        <Table caption='events'>
          <Table.Head>
            <Table.Row>
              <Table.ColHeader id='status'>Status</Table.ColHeader>
              <Table.ColHeader id='jobNumber'>Job Number</Table.ColHeader>
              <Table.ColHeader id='companyNotes'>Company Notes</Table.ColHeader>
              <Table.ColHeader id='startDate'>Start Date</Table.ColHeader>
              <Table.ColHeader id='endDate'>End Date</Table.ColHeader>
              <Table.ColHeader id='updatedAt'>Updated At</Table.ColHeader>
            </Table.Row>
          </Table.Head>
          <Table.Body>{rows}</Table.Body>
        </Table>
        <Button onClick={this.handleDeleteClick}>Delete Equipment</Button>
        <Button onClick={this.handleAddEventClick}>Add Event</Button>
      </div>
    )
  }
}

export default withRouter(EquipmentDetailsPage)
