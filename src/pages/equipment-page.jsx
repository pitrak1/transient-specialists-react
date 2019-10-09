import React from 'react'
import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core'
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

  handleSearchChange = event => {
    this.setState({ searchValue: event.target.value })
  }

  handleDetailsClick = event => {
    const id = event.target.getAttribute('data-id')
    this.props.history.push(`/equipment/${id}`)
  }

  handleAddClick = _event => {
    this.props.history.push(`/equipment/create`)
  }

  render() {
    if (this.state.loading) {
      return <CircularProgress />
    }

    if (this.state.error) {
      return <div>{this.state.error}</div>
    }

    const rows = this.state.data.map(datum => {
      return (
        <TableRow key={datum.id}>
          <TableCell>{datum.serialNumber}</TableCell>
          <TableCell>{datum.oemName}</TableCell>
          <TableCell>{datum.modelName}</TableCell>
          <TableCell>{datum.typeName}</TableCell>
          <TableCell>
            <Button data-id={datum.id} onClick={this.handleDetailsClick}>
              Details
            </Button>
          </TableCell>
        </TableRow>
      )
    })

    return (
      <div>
        {this.state.alert && <div>{this.state.alert}</div>}
        <Typography variant='h5'>Equipment</Typography>
        <TextField
          id='search'
          label='Search'
          value={this.state.searchValue}
          onChange={this.handleSearchChange}
          variant='outlined'
        />
        <Button onClick={this.handleAddClick}>Add Equipment</Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Serial Number</TableCell>
              <TableCell>OEM Name</TableCell>
              <TableCell>Model Name</TableCell>
              <TableCell>Type Name</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </div>
    )
  }
}

export default withRouter(EquipmentPage)
