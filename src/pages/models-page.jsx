import React from 'react'
import { Spinner } from '@instructure/ui-elements'
import { Alert } from '@instructure/ui-alerts'
import { Link } from 'react-router-dom'
import { Heading } from '@instructure/ui-elements'
import { Flex } from '@instructure/ui-layout'
import { TextInput } from '@instructure/ui-text-input'
import { Table } from '@instructure/ui-table'
import api from '../api.js'

class ModelsPage extends React.Component {
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
            <Link to={`/models/${datum.id}`}>Details</Link>
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
            <TextInput
              onChange={this.handleSearchChange}
              renderLabel='Search'
              value={this.state.searchValue}
            />
          </Flex.Item>
          <Flex.Item>
            <Link to={`/models/create`}>Add Model</Link>
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
              <Table.ColHeader id='Details'></Table.ColHeader>
            </Table.Row>
          </Table.Head>
          <Table.Body>{rows}</Table.Body>
        </Table>
      </div>
    )
  }
}

export default ModelsPage
