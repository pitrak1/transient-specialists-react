import React from 'react'
import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core'
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
    perPage: 1,
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

  handleSearchChange = (_e, value) => {
    this.setState({ searchValue: value })
  }

  handleSearchClick = () => {
    this.getData()
  }

  handleDeleteClick = event => {
    if (confirm('Are you sure you want to delete this type?')) {
      this.setState({ loading: true })
      api.deleteDestroy(
        'types',
        event.target.getAttribute('data-id'),
        _response => {
          api.getIndex(
            'types',
            result => {
              this.setState({ loading: false, data: result })
            },
            error => {
              this.setState({ loading: false, error })
            },
          )
        },
        error => {
          this.setState({ loading: false, alert: error })
        },
      )
    }
  }

  handleShowClick = event => {
    const name = event.target.getAttribute('data-name')
    this.props.history.push(`/equipment/search/${name}`)
  }

  handleAddClick = event => {
    this.props.history.push(`/types/create`)
  }

  handlePageChange = (_event, newPage) => {
    this.setState({ page: newPage }, this.getData)
  }

  handlePerPageChange = event => {
    this.setState({ perPage: event.target.value }, this.getData)
  }

  render() {
    if (this.state.loading) {
      return <CircularProgress />
    }

    if (this.state.error) {
      return <div>{this.state.error}</div>
    }

    const rows = this.state.data.types.map(datum => {
      return (
        <TableRow key={datum.id}>
          <TableCell>{datum.name}</TableCell>
          <TableCell>
            <Button data-name={datum.name} onClick={this.handleShowClick}>
              Show Equipment
            </Button>
          </TableCell>
          <TableCell>
            <Button data-id={datum.id} onClick={this.handleDeleteClick}>
              Delete
            </Button>
          </TableCell>
        </TableRow>
      )
    })

    return (
      <div>
        {this.state.alert && <div>{this.state.alert}</div>}
        <Typography variant='h5'>Types</Typography>
        <TextField
          id='search'
          label='Search'
          value={this.state.searchValue}
          onChange={this.handleSearchChange}
          variant='outlined'
        />
        <Button onClick={this.handleSearchClick}>Search</Button>
        <Button onClick={this.handleAddClick}>Add Type</Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[1, 5, 10, 25]}
          component='div'
          count={this.state.data.count}
          rowsPerPage={this.state.perPage}
          page={this.state.page}
          onChangePage={this.handlePageChange}
          onChangeRowsPerPage={this.handlePerPageChange}
        />
      </div>
    )
  }
}

export default withRouter(TypesPage)
