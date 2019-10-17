import React from 'react'
import { Button, Grid, Toolbar, Typography } from '@material-ui/core'
import ErrorAlert from 'common/error-alert'
import Spinner from 'common/spinner'
import Title from 'common/title'
import Subtitle from 'common/subtitle'
import FullTable from 'common/table/full-table'
import api from 'src/api'
import utils from 'src/utils'
import { withRouter } from 'react-router'

export class EquipmentDetailsPage extends React.Component {
  state = {
    alert: null,
    ascending: false,
    data: {},
    error: null,
    loading: true,
    page: 0,
    perPage: 10,
    sortBy: 'updatedAt',
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    this.setState({ loading: true })
    const { ascending, page, perPage, sortBy } = this.state
    api.getShow(
      'equipment',
      this.props.match.params.id,
      {
        ascending,
        page,
        perPage,
        sortBy,
      },
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

  handleEditClick = () => {
    const id = this.state.data.equipment.id
    this.props.history.push(`/equipment/edit/${id}`)
  }

  handleDeleteClick = () => {
    this.setState({ loading: true })
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
    this.props.history.push(`/events/${id}/create`)
  }

  handlePageChange = (_event, newPage) => {
    this.setState({ page: newPage }, this.getData)
  }

  handlePerPageChange = event => {
    this.setState({ perPage: event.target.value }, this.getData)
  }

  handleSort = (sortBy, ascending) => {
    this.setState({ sortBy, ascending }, this.getData)
  }

  handleEventEditClick = id => {
    this.props.history.push(
      `/events/${this.state.data.equipment.id}/edit/${id}`,
    )
  }

  handleEventDeleteClick = id => {
    this.setState({ loading: true })
    if (confirm('Are you sure you want to delete this event?')) {
      const success = _response => {
        this.getData()
      }

      const failure = error => {
        this.setState({ loading: false, alert: error })
      }

      api.deleteDestroy('events', id, success, failure)
    }
  }

  render() {
    if (this.state.loading) {
      return <Spinner />
    }

    if (this.state.error) {
      return <ErrorAlert closable={false} text={this.state.error} />
    }

    const equipment = this.state.data.equipment

    const headers = [
      { type: 'value', id: 'status', label: 'Status' },
      { type: 'value', id: 'jobNumber', label: 'Job Number' },
      { type: 'value', id: 'companyNotes', label: 'Company/Notes' },
      { type: 'value', id: 'startDate', label: 'Start Date' },
      { type: 'value', id: 'endDate', label: 'End Date' },
      { type: 'value', id: 'updatedAt', label: 'Updated At' },
      { type: 'button', id: 'edit' },
      { type: 'button', id: 'delete' },
    ]

    const data = this.state.data.events.map(event => ({
      id: event.id,
      cells: [
        { id: 'status', type: 'value', value: event.status },
        { id: 'jobNumber', type: 'value', value: event.jobNumber },
        { id: 'companyNotes', type: 'value', value: event.companyNotes },
        { id: 'startDate', type: 'date', value: event.startDate },
        { id: 'endDate', type: 'date', value: event.endDate },
        { id: 'updatedAt', type: 'date', value: event.updatedAt },
        {
          id: 'edit',
          type: 'button',
          value: 'Edit',
          callback: this.handleEventEditClick,
        },
        {
          id: 'delete',
          type: 'button',
          value: 'Delete',
          callback: this.handleEventDeleteClick,
        },
      ],
    }))

    return (
      <div>
        {this.state.alert && (
          <ErrorAlert closable={true} text={this.state.alert} />
        )}
        <Toolbar>
          <Title label={equipment.serialNumber} />
          <Button onClick={this.handleEditClick}>Edit</Button>
          <Button onClick={this.handleDeleteClick}>Delete</Button>
        </Toolbar>
        <Grid container>
          <Grid item xs={12}>
            OEM:
            <Button
              onClick={() => {
                this.props.history.push(`/oems/search/${equipment.oemName}`)
              }}
            >
              {equipment.oemName}
            </Button>
          </Grid>
          <Grid item xs={12}>
            Model:
            <Button
              onClick={() => {
                this.props.history.push(`/models/search/${equipment.modelName}`)
              }}
            >
              {equipment.modelName}
            </Button>
          </Grid>
          <Grid item xs={12}>
            Type:
            <Button
              onClick={() => {
                this.props.history.push(`/types/search/${equipment.typeName}`)
              }}
            >
              {equipment.typeName}
            </Button>
          </Grid>
          <Grid item xs={12}>
            Status: {equipment.eventStatus}
          </Grid>
          <Grid item xs={12}>
            Job Number: {equipment.eventJobNumber}
          </Grid>
          <Grid item xs={12}>
            Company/Notes: {equipment.eventCompanyNotes}
          </Grid>
          <Grid item xs={12}>
            <Subtitle label='Notes' />
          </Grid>
          <Grid item xs={12}>
            {equipment.notes}
          </Grid>
          <Grid item xs={12}>
            <Subtitle label='Calibration Info' />
          </Grid>
          <Grid item xs={12}>
            Calibration Company: {equipment.calCompany}
          </Grid>
          <Grid item xs={12}>
            Calibration Due: {utils.convertISO(equipment.calDue)}
          </Grid>
        </Grid>
        <Toolbar>
          <Typography variant='h5'>Events</Typography>
          <Button onClick={this.handleAddEventClick}>Add</Button>
        </Toolbar>
        <FullTable
          ascending={this.state.ascending}
          count={parseInt(this.state.data.count)}
          data={data}
          headers={headers}
          onPageChange={this.handlePageChange}
          onPerPageChange={this.handlePerPageChange}
          onSort={this.handleSort}
          page={this.state.page}
          perPage={this.state.perPage}
          perPageOptions={[5, 10, 25]}
          sortBy={this.state.sortBy}
        />
      </div>
    )
  }
}

export default withRouter(EquipmentDetailsPage)
