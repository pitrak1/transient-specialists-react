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

export class OemsPage extends React.Component {
  state = {
    alert: null,
    ascending: true,
    data: {},
    error: null,
    loading: true,
    searchValue: '',
    sortBy: 'name',
  }

  componentDidMount() {
    api.getIndex(
      'oems',
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

  handleDeleteClick = event => {
    if (confirm('Are you sure you want to delete this OEM?')) {
      this.setState({ loading: true })
      api.deleteDestroy(
        'oems',
        event.target.getAttribute('data-id'),
        _response => {
          api.getIndex(
            'oems',
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

  handleShowEquipmentClick = event => {
    const name = event.target.getAttribute('data-name')
    this.props.history.push(`/equipment/search/${name}`)
  }

  handleShowModelsClick = event => {
    const name = event.target.getAttribute('data-name')
    this.props.history.push(`/models/search/${name}`)
  }

  handleAddClick = event => {
    this.props.history.push(`/oems/create`)
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
          <TableCell>{datum.name}</TableCell>
          <TableCell>
            <Button
              data-name={datum.name}
              onClick={this.handleShowEquipmentClick}
            >
              Show Equipment
            </Button>
          </TableCell>
          <TableCell>
            <Button data-name={datum.name} onClick={this.handleShowModelsClick}>
              Show Models
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
        <Typography variant='h5'>OEMs</Typography>
        <TextField
          id='search'
          label='Search'
          value={this.state.searchValue}
          onChange={this.handleSearchChange}
          variant='outlined'
        />
        <Button onClick={this.handleAddClick}>Add OEM</Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </div>
    )
  }
}

export default withRouter(OemsPage)
