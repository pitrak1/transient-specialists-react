import React from 'react'
import {
  Button,
  CircularProgress,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core'
import FullTable from '../components/full-table.jsx'
import { withRouter } from 'react-router'
import api from '../api.js'

export class EquipmentPage extends React.Component {
  state = {
    alert: null,
    ascending: true,
    data: {},
    error: null,
    loading: true,
    page: 0,
    perPage: 10,
    searchValue: this.props.match.params.search || '',
    sortBy: 'serialNumber',
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    this.setState({ loading: true })
    const { ascending, page, perPage, searchValue, sortBy } = this.state
    api.getIndex(
      'equipment',
      {
        ascending,
        page,
        perPage,
        searchValue,
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

  handleDetailsClick = id => {
    this.props.history.push(`/equipment/${id}`)
  }

  handleAddClick = _event => {
    this.props.history.push(`/equipment/create`)
  }

  handleSearchChange = event => {
    this.setState({ searchValue: event.target.value })
  }

  handleSearchClick = () => {
    this.getData()
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

  render() {
    if (this.state.loading) {
      return <CircularProgress size={120} />
    }

    if (this.state.error) {
      return <div>{this.state.error}</div>
    }

    const headers = [
      { type: 'value', id: 'serialNumber', label: 'Serial Number' },
      { type: 'value', id: 'oemName', label: 'OEM' },
      { type: 'value', id: 'modelName', label: 'Model' },
      { type: 'value', id: 'typeName', label: 'Type' },
      { type: 'value', id: 'notes', label: 'Notes' },
      { type: 'value', id: 'eventStatus', label: 'Status' },
      { type: 'value', id: 'eventCompanyNotes', label: 'Company/Notes' },
      { type: 'value', id: 'eventStartDate', label: 'Start Date' },
      { type: 'value', id: 'eventEndDate', label: 'End Date' },
      { type: 'button', id: 'details' },
    ]

    const data = this.state.data.equipment.map(equipment => ({
      id: equipment.id,
      cells: [
        { id: 'serialNumber', type: 'value', value: equipment.serialNumber },
        { id: 'oemName', type: 'value', value: equipment.oemName },
        { id: 'modelName', type: 'value', value: equipment.modelName },
        { id: 'typeName', type: 'value', value: equipment.typeName },
        { id: 'notes', type: 'value', value: equipment.notes },
        { id: 'eventStatus', type: 'value', value: equipment.eventStatus },
        {
          id: 'eventCompanyNotes',
          type: 'value',
          value: equipment.eventCompanyNotes,
        },
        {
          id: 'eventStartDate',
          type: 'value',
          value: equipment.eventStartDate,
        },
        { id: 'eventEndDate', type: 'value', value: equipment.eventEndDate },
        {
          id: 'details',
          type: 'button',
          value: 'Details',
          callback: this.handleDetailsClick,
        },
      ],
    }))

    return (
      <div>
        {this.state.alert && <div>{this.state.alert}</div>}
        <Toolbar>
          <Typography variant='h5'>Equipment</Typography>
          <Button onClick={this.handleAddClick}>Add</Button>
          <div style={{ flexGrow: 1 }}></div>
          <TextField
            id='search'
            label='Search'
            value={this.state.searchValue}
            onChange={this.handleSearchChange}
          />
          <Button onClick={this.handleSearchClick}>Search</Button>
        </Toolbar>
        <FullTable
          ascending={this.state.ascending}
          count={this.state.data.count}
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

export default withRouter(EquipmentPage)
