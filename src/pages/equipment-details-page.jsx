import React from 'react'
import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from '@material-ui/core'
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
      return <CircularProgress />
    }

    if (this.state.error) {
      return <div>{this.state.error}</div>
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
      <Typography key={field.label} variant='body1'>
        {field.label}
        {field.value}
      </Typography>
    ))

    const events = this.state.data.events
    const rows = events.map(event => (
      <TableRow key={event.id}>
        <TableCell>{event.status}</TableCell>
        <TableCell>{event.jobNumber}</TableCell>
        <TableCell>{event.companyNotes}</TableCell>
        <TableCell>{event.startDate}</TableCell>
        <TableCell>{event.endDate}</TableCell>
        <TableCell>{event.updatedAt}</TableCell>
      </TableRow>
    ))

    return (
      <div>
        {this.state.alert && <div>{this.state.alert}</div>}
        <Typography level='h5' margin='medium'>
          {equipment.serialNumber}
        </Typography>
        {fields}
        <Button onClick={this.handleDeleteClick}>Delete Equipment</Button>
        <Toolbar>
          <Typography variant='h5'>Events</Typography>
          <Button onClick={this.handleAddEventClick}>Add</Button>
        </Toolbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>Job Number</TableCell>
              <TableCell>Company Notes</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </div>
    )
  }
}

export default withRouter(EquipmentDetailsPage)
