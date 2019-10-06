import React from 'react'
import { Spinner } from '@instructure/ui-elements'
import { Alert } from '@instructure/ui-alerts'
import { Heading } from '@instructure/ui-elements'
import { Flex } from '@instructure/ui-layout'
import TextField from '@material-ui/core/TextField'
import { Table } from '@instructure/ui-table'
import { Button } from '@instructure/ui-buttons'
import { withRouter } from 'react-router'
import api from '../api.js'

export class ModelsPage extends React.Component {
  state = {
    alert: null,
    ascending: true,
    data: {},
    error: null,
    loading: true,
    searchValue: this.props.match.params.search || '',
    sortBy: 'name',
  }

  componentDidMount() {
    api.getIndex(
      'models',
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

  handleSort = (_e, { id }) => {
    if (this.state.sortBy === id) {
      this.setState({ ascending: !this.state.ascending })
    } else {
      this.setState({ ascending: true, sortBy: id })
    }
  }

  handleDeleteClick = event => {
    if (confirm('Are you sure you want to delete this model?')) {
      this.setState({ loading: true })
      api.deleteDestroy(
        'models',
        event.target.getAttribute('data-id'),
        _response => {
          api.getIndex(
            'models',
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
    this.props.history.push(`/models/create`)
  }

  getSortDirection = id => {
    if (this.state.sortBy === id) {
      return this.state.ascending ? 'ascending' : 'descending'
    }
    return 'none'
  }

  getFilteredAndSortedData = () => {
    const value = this.state.searchValue.toLowerCase()
    const filtered = this.state.data.filter(
      datum =>
        !value ||
        datum.name.toLowerCase().startsWith(value) ||
        datum.oemName.toLowerCase().startsWith(value),
    )
    return filtered.sort((a, b) => {
      return this.state.ascending
        ? a[this.state.sortBy].localeCompare(b[this.state.sortBy])
        : b[this.state.sortBy].localeCompare(a[this.state.sortBy])
    })
  }

  render() {
    if (this.state.loading) {
      return <Spinner renderTitle='Loading' size='large' />
    }

    if (this.state.error) {
      return <Alert variant='error'>{this.state.error}</Alert>
    }

    const rows = this.getFilteredAndSortedData().map(datum => {
      return (
        <Table.Row key={datum.id}>
          <Table.Cell>{datum.name}</Table.Cell>
          <Table.Cell>{datum.oemName}</Table.Cell>
          <Table.Cell>
            <Button data-name={datum.name} onClick={this.handleShowClick}>
              Show Equipment
            </Button>
          </Table.Cell>
          <Table.Cell>
            <Button data-id={datum.id} onClick={this.handleDeleteClick}>
              Delete
            </Button>
          </Table.Cell>
        </Table.Row>
      )
    })

    return (
      <div>
        {this.state.alert && <Alert variant='error'>{this.state.alert}</Alert>}
        <Flex>
          <Flex.Item grow shrink>
            <Heading level='h1' margin='medium'>
              Models
            </Heading>
          </Flex.Item>
          <Flex.Item margin='small'>
            <TextField
              id='search'
              label='Search'
              value={this.state.searchValue}
              onChange={this.handleSearchChange}
              variant='outlined'
            />
          </Flex.Item>
          <Flex.Item>
            <Button onClick={this.handleAddClick}>Add Model</Button>
          </Flex.Item>
        </Flex>
        <Table caption='Models' hover={true}>
          <Table.Head>
            <Table.Row>
              <Table.ColHeader
                id='name'
                onRequestSort={this.handleSort}
                sortDirection={this.getSortDirection('name')}
              >
                Name
              </Table.ColHeader>
              <Table.ColHeader
                id='oemName'
                onRequestSort={this.handleSort}
                sortDirection={this.getSortDirection('oemName')}
              >
                OEM Name
              </Table.ColHeader>
              <Table.ColHeader id='Equipment' width='2%'></Table.ColHeader>
              <Table.ColHeader id='Delete' width='2%'></Table.ColHeader>
            </Table.Row>
          </Table.Head>
          <Table.Body>{rows}</Table.Body>
        </Table>
      </div>
    )
  }
}

export default withRouter(ModelsPage)
