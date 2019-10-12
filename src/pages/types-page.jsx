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

export class TypesPage extends React.Component {
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
      'types',
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

  handleShowClick = id => {
    const type = this.state.data.types.filter(t => t.id == id)[0]
    this.props.history.push(`/equipment/search/${type.name}`)
  }

  handleEditClick = id => {
    this.props.history.push(`/types/edit/${id}`)
  }

  handleDeleteClick = id => {
    if (confirm('Are you sure you want to delete this type?')) {
      this.setState({ loading: true })
      api.deleteDestroy(
        'types',
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
    this.props.history.push(`/types/create`)
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
      { type: 'button', id: 'edit' },
      { type: 'button', id: 'delete' },
    ]

    const data = this.state.data.types.map(type => ({
      id: type.id,
      cells: [
        { id: 'name', type: 'value', value: type.name },
        {
          id: 'showEquipment',
          type: 'button',
          value: 'Equipment',
          callback: this.handleShowClick,
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
          <Typography variant='h5'>Types</Typography>
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

export default withRouter(TypesPage)
