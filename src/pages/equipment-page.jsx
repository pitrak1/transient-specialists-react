import React from 'react'
import { Spinner } from '@instructure/ui-elements'
import { Alert } from '@instructure/ui-alerts'
import { Heading } from '@instructure/ui-elements'
import { Flex } from '@instructure/ui-layout'
import { Table } from '@instructure/ui-table'
import { Button } from '@instructure/ui-buttons'
import TextField from '@material-ui/core/TextField'
import { withRouter } from 'react-router'
import api from '../api.js'

export class EquipmentPage extends React.Component {
  state = {
    alert: null,
    ascending: true,
    data: {},
    error: null,
    loading: true,
    searchValue: this.props.match.params.search || '',
    sortBy: 'serialNumber',
  }

  componentDidMount() {
    api.getIndex(
      'equipment',
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

  handleSort = (_e, { id }) => {
    if (this.state.sortBy === id) {
      this.setState({ ascending: !this.state.ascending })
    } else {
      this.setState({ ascending: true, sortBy: id })
    }
  }

  handleDetailsClick = event => {
    const id = event.target.getAttribute('data-id')
    this.props.history.push(`/equipment/${id}`)
  }

  handleAddClick = _event => {
    this.props.history.push(`/equipment/create`)
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
        datum.serialNumber.toLowerCase().startsWith(value) ||
        datum.oemName.toLowerCase().startsWith(value) ||
        datum.modelName.toLowerCase().startsWith(value) ||
        datum.typeName.toLowerCase().startsWith(value),
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
          <Table.Cell>{datum.serialNumber}</Table.Cell>
          <Table.Cell>{datum.oemName}</Table.Cell>
          <Table.Cell>{datum.modelName}</Table.Cell>
          <Table.Cell>{datum.typeName}</Table.Cell>
          <Table.Cell>
            <Button data-id={datum.id} onClick={this.handleDetailsClick}>
              Details
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
              Equipment
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
            <Button onClick={this.handleAddClick}>Add Equipment</Button>
          </Flex.Item>
        </Flex>
        <Table caption='Equipment' hover={true}>
          <Table.Head>
            <Table.Row>
              <Table.ColHeader
                id='serialNumber'
                onRequestSort={this.handleSort}
                sortDirection={this.getSortDirection('serialNumber')}
              >
                Serial Number
              </Table.ColHeader>
              <Table.ColHeader
                id='oemName'
                onRequestSort={this.handleSort}
                sortDirection={this.getSortDirection('oemName')}
              >
                OEM Name
              </Table.ColHeader>
              <Table.ColHeader
                id='modelName'
                onRequestSort={this.handleSort}
                sortDirection={this.getSortDirection('modelName')}
              >
                Model Name
              </Table.ColHeader>
              <Table.ColHeader
                id='typeName'
                onRequestSort={this.handleSort}
                sortDirection={this.getSortDirection('typeName')}
              >
                Type Name
              </Table.ColHeader>
              <Table.ColHeader id='Details' width='2%'></Table.ColHeader>
            </Table.Row>
          </Table.Head>
          <Table.Body>{rows}</Table.Body>
        </Table>
      </div>
    )
  }
}

export default withRouter(EquipmentPage)
