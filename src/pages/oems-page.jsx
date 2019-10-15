import React from 'react'
import {
  Button,
  CircularProgress,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core'
import FullTable from '../components/table/full-table.jsx'
import { withRouter } from 'react-router'
import api from '../api.js'

export class OemsPage extends React.Component {
  state = {
    alert: null,
    ascending: true,
    data: {},
    error: null,
    loading: true,
    page: 0,
    perPage: 10,
    searchValue: '',
    sortBy: 'name',
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    this.setState({ loading: true })
    const { ascending, page, perPage, searchValue, sortBy } = this.state
    api.getIndex(
      'oems',
      {
        ascending,
        page,
        perPage,
        searchValue,
        sortBy,
      },
      result => {
        this.setState({ loading: false, ...result })
      },
      error => {
        this.setState({ loading: false, error })
      },
    )
  }

  handleShowEquipmentClick = id => {
    const oem = this.state.data.filter(o => o.id == id)[0]
    this.props.history.push(`/equipment/search/${oem.name}`)
  }

  handleShowModelsClick = id => {
    const oem = this.state.data.filter(o => o.id == id)[0]
    this.props.history.push(`/models/search/${oem.name}`)
  }

  handleEditClick = id => {
    this.props.history.push(`/oems/edit/${id}`)
  }

  handleDeleteClick = id => {
    if (confirm('Are you sure you want to delete this OEM?')) {
      this.setState({ loading: true })
      api.deleteDestroy(
        'oems',
        id,
        _response => {
          this.getData()
        },
        error => {
          this.setState({ loading: false, alert: error })
        },
      )
    }
  }

  handleAddClick = _event => {
    this.props.history.push(`/oems/create`)
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
      { type: 'value', id: 'name', label: 'Name' },
      { type: 'button', id: 'showEquipment' },
      { type: 'button', id: 'showModels' },
      { type: 'button', id: 'edit' },
      { type: 'button', id: 'delete' },
    ]

    const data = this.state.data.map(oem => ({
      id: oem.id,
      cells: [
        { id: 'name', type: 'value', value: oem.name },
        {
          id: 'showEquipment',
          type: 'button',
          value: 'Equipment',
          callback: this.handleShowEquipmentClick,
        },
        {
          id: 'showModels',
          type: 'button',
          value: 'Models',
          callback: this.handleShowModelsClick,
        },
        {
          id: 'edit',
          type: 'button',
          value: 'Edit',
          callback: this.handleEditClick,
        },
        {
          id: 'delete',
          type: 'button',
          value: 'Delete',
          callback: this.handleDeleteClick,
        },
      ],
    }))

    return (
      <div>
        {this.state.alert && <div>{this.state.alert}</div>}
        <Toolbar>
          <Typography variant='h5'>OEMs</Typography>
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
          count={parseInt(this.state.count)}
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

export default withRouter(OemsPage)
